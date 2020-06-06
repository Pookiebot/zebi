const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");
const ms = require("ms");
class Ban extends Command {
  constructor(client) {
    super(client, {
      name: "softban",
      description: "bannir un utilisateur avec une durée",
      usage: "softban",
      guildOnly: true,
      category: "Système",
      permLevel: "GM"
    });
  }

  async run(message, args) {
    try {
      message.delete()
      const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      const bUsered = await this.client.fetchUser(bUser.id);
      if (!bUser) return message.channel.send("Utilisateur introuvable !").then(msg => msg.delete(2500));
      const banTime = args[1];
      const bReason = args.join(" ").slice(25);
      if(!bReason) return message.channel.send("aucune raison spécifié").then(msg => msg.delete(2500));
      if(!message.member.roles.find("name", "💣")) return message.channel.send("tu n'a pas la permission pour exécuter cette commande").then(msg => msg.delete(2500))
      message.channel.send(`L'utilisateur ${bUser} a été banni <raison : ${bReason}> pour une durée de ${banTime}`);
      
      const banEmbed = new RichEmbed()
        .setAuthor(`${bUsered.tag}`, bUsered.displayAvatarURL)
        .setThumbnail(bUsered.displayAvatarURL)
        .setDescription("~Banned~")
        .setColor("RED")
        .addField("Utilisateur banni", `${bUsered.tag} avec l'ID ${bUser.id}`)
        .addField("Banni par", `${message.author.tag}`)
        .addField("Banni dans le channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Raison", bReason)
        .addField("Durée", banTime)
        .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
        .setTimestamp();
      
      let banchannel = message.guild.channels.find(bcnl => bcnl.name === "silent-logs");
      //message.guild.member(bUser).ban(bReason);
      banchannel.send(banEmbed);
      setTimeout(function() { message.guild.unban(bUser.id);
      message.channel.send(`L'utilisateur ${bUser.id} n'est plus ban !`);
    }, ms(banTime));
    } catch (e) {
        console.log(e);
    }
  }
}

module.exports = Ban;