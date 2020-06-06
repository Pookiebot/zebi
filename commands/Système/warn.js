const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js")
const ms = require("ms"); 
class Warn extends Command { 
  constructor(client) { 
   super(client, { 
    name: "warn", 
    description: "Commande pour avertir un utilisateur.", 
    usage: "warn", 
    category: "Système", 
    permLevel: "GM" 
  });
} 
async run(message, args) { 
  try {
    message.delete()
    const warnedUser = message.guild.member( message.mentions.users.first() || message.guild.members.get(args[0]) );
      if (!warnedUser) return message.channel.send("L'utilisateur n'existe pas.");
    const warnToAdd = 1;
    const reason = args.join(" ").slice(22);
    if(!reason) return message.channel.send("Aucune raison spécifié !");
    this.client.warns.ensure(`${warnedUser.id}`, { 
      warnings: 0 
    });
    let userWarnings = this.client.warns.get(`${warnedUser.id}`, "warnings");
      userWarnings += warnToAdd; this.client.warns.set(`${warnedUser.id}`, userWarnings, "warnings");
      message.delete(); 
    if (this.client.warns.get(`${warnedUser.id}`, "warnings") == 1) { message.channel.send( `${warnedUser}, premier avertissement (raison: ${reason})` );
    } else if (this.client.warns.get(`${warnedUser.id}`, "warnings") == 2) { 
      const muteRole = message.guild.roles.find(x => x.name === "muted");
        message.channel.send( `${warnedUser}, deuxième avertissement (raison: ${reason})` );
      const muteTime = "10m";
      await warnedUser.addRole(muteRole.id);
        message.channel.send( `${warnedUser} est muté pendant ${muteTime} (raison: ${reason})` 
      );
      setTimeout(function() { warnedUser.removeRole(muteRole.id); message.channel.send(`L'utilisateur ${warnedUser} n'est plus muté !`);
      }, ms(muteTime));
    }
  } catch (e) { 
      console.log(e); 
  } 
}
} module.exports = Warn;