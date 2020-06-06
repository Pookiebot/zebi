const Command = require("../../modules/Command.js");
const ms = require("ms"); 
class Warnstat extends Command { 
  constructor(client) { 
    super(client, { 
      name: "warnstat", 
      description: "Voir le nombre de warn d'un membre ou qu'on a reçu.", 
      usage: "warnstat",
      guildOnly: true
    });
  } 
  async run(message, args) { 
    try {
      message.delete();
      if (!args[0]) {
        message.channel.send(
         `Tu as actuellement ${this.client.warns.get(
         `${message.author.id}`,
         "warnings"
         )} warn`).then(msg => msg.delete(5000));
      } else {
        const warnedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send(
          `${warnedUser} a actuellement ${this.client.warns.get(`${warnedUser}`,"warnings")} warn.`).then(msg => msg.delete(5000));
      }
    } catch (e) { 
      console.log(e); 
    } 
  }
} module.exports = Warnstat;