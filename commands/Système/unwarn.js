const Command = require("../../modules/Command.js");
const ms = require("ms"); 
class UnWarn extends Command { 
  constructor(client) { 
    super(client, { 
      name: "unwarn", 
      description: "Commande pour retirer l'avertissement  d'un utilisateur.", 
      usage: "unwarn", 
      category: "Système", 
      permLevel: "GM" 
    });
  } 
  async run(message, args) { 
    try {
      message.delete()
      const warnedUser = message.guild.member( message.mentions.users.first() || message.guild.members.get(args[0]) );
      if (!warnedUser) return message.channel.send("L'utilisateur n'existe pas.");
      if (!args[1]) return message.channel.send("Veuillez renseigner le nombre de warn a retirer");
      const warnToRemove = -args[1];
      this.client.warns.ensure(`${warnedUser.id}`, { 
        warnings: 0 
      }); 
      let userWarnings = this.client.warns.get(`${warnedUser.id}`, "warnings");
      if (this.client.warns.get(`${warnedUser.id}`, "warnings")  < 0) return message.channel.send(`L'utilisateur ${warnedUser} n'a aucun warn.`).then(msg => msg.delete(2500));
      userWarnings += warnToRemove; this.client.warns.set(`${warnedUser.id}`, userWarnings, "warnings");
      message.delete();
      message.reply(`a retiré ${args[1]} warn a l'utilisateur ${warnedUser}`)
    } catch (e) { 
      console.log(e); 
    } 
  }
} module.exports = UnWarn;