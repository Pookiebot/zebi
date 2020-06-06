const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");
const ms = require("ms");
class UnBan extends Command {
  constructor(client) {
    super(client, {
      name: "unban",
      description: "debannir un utilisateur avec une durée",
      usage: "unban",
      guildOnly: true,
      category: "Système",
      permLevel: "GM"
    });
  }

  async run(message, args) {
    try {
      message.delete()
      const ubUser = await this.client.fetchUser(args[0]);
      if (!ubUser) return message.channel.send("Utilisateur introuvable !").then(msg => msg.delete(2500));
      const ubReason = args.slice(1).join(" ");
      if(!ubReason) return message.channel.send("aucune raison spécifié").then(msg => msg.delete(2500));
      //message.guild.unban(ubUser, {raison : ubReason})
      message.channel.send(`L'utilisateur ${ubUser.tag} a été debanni <raison : ${ubReason}> nous t'offrons une seconde chance`);
      const unbanEmbed = new RichEmbed()
        .setAuthor(`${ubUser.tag}`, ubUser.displayAvatarURL)
        .setThumbnail(ubUser.displayAvatarURL)
        .setDescription("~UnBanned~")
        .setColor("GREEN")
        .addField("Utilisateur debanni", `${ubUser.tag} avec l'ID ${ubUser.id}`)
        .addField("Debanni par", `${message.author.tag}`)
        .addField("Debanni dans le channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Raison", ubReason)
        .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
        .setTimestamp();
      
      let unbanchannel = message.guild.channels.find(ubcnl => ubcnl.name === "silent-logs");
      unbanchannel.send(unbanEmbed);
    } catch (e) {
        console.log(e);
    }
  }
}

module.exports = UnBan;