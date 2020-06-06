const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");

class Kick extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      description: "Expulse un utilisateur",
      usage: "kick",
      guildOnly: true,
      category: "Système",
      permLevel: "GM"
    });
  }

  async run(message, args) {
    try {
      message.delete()
      const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if (!kUser) return message.channel.send("Utilisateur introuvable !");
      const kUsered = await this.client.fetchUser(kUser.id);
      const kReason = args.join(" ").slice(22);
      if(!kReason) return message.channel.send("aucune raison spécifié");
      if(kUser.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition) return message.channel.send(":x: la personne que tu veux kick a un role supèrieur a toi ! :x:")
      message.channel.send(`L'utilisateur ${kUser} a été expulsé du serveur <raison : ${kReason}>.`)
      const kickEmbed = new RichEmbed()
        .setAuthor(`${kUsered.tag}`, kUsered.displayAvatarURL)
        .setThumbnail(kUsered.displayAvatarURL)
        .setDescription("~Kick~")
        .setColor("ORANGE")
        .addField("Utilisateur expulsé", `${kUser} avec l'ID ${kUser.id}`)
        .addField("Expulsé par", `${message.author.tag}`)
        .addField("Expulsé dans le channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Raison", kReason)
        .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
        .setTimestamp();
      
      let kickchannel = message.guild.channels.find(kcnl => kcnl.name === "silent-logs");
      //message.guild.member(kUser).kick(kReason);
      kickchannel.send(kickEmbed);
      
      
    } catch (e) {
        console.log(e);
    }
  }
}

module.exports = Kick;