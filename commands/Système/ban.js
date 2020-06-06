const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");
const ms = require("ms");
class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      description: "bannir un utilisateur définitivement",
      usage: "ban",
      guildOnly: true,
      category: "Système",
      permLevel: "GA"
    });
  }

  async run(message, args) {
    try {
      message.delete()
      const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      const bUsered = await this.client.fetchUser(bUser.id);
      if (!bUser) return message.channel.send("Utilisateur introuvable !").then(msg => msg.delete(2500));
      const bReason = args.join(" ").slice(22);
      if(!bReason) return message.channel.send("aucune raison spécifié").then(msg => msg.delete(2500));
      message.channel.send(`L'utilisateur ${bUser} a été banni <raison : ${bReason}> pour une durée indéterminé.`);
      
      const banEmbed = new RichEmbed()
        .setAuthor(`${bUsered.tag}`, bUsered.displayAvatarURL)
        .setThumbnail(bUsered.displayAvatarURL)
        .setDescription("~Banned~")
        .setColor("RED")
        .addField("Utilisateur banni", `${bUser} avec l'ID ${bUser.id}`)
        .addField("Banni par", `${message.author.tag}`)
        .addField("Banni dans le channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Raison", bReason)
        .addField("Durée", "∞")
        .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
        .setTimestamp();
      
      let banchannel = message.guild.channels.find(bcnl => bcnl.name === "silent-logs");
      //message.guild.member(bUser).ban(bReason);
      banchannel.send(banEmbed);
    } catch (e) {
        console.log(e);
    }
  }
}

module.exports = Ban;