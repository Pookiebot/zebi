const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");
const ms = require("ms");
class UnMute extends Command {
  constructor(client) {
    super(client, {
      name: "unmute",
      description: "Unmute un utilisateur définitivement",
      usage: "unmute [user]",
      guildOnly: true,
      category: "Système",
      permLevel: "GM"
    });
  }

  async run(message, args) {
    try {
      message.delete()
      const mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      const muteTime = args[1];
      const mUsered = await this.client.fetchUser(mUser.id);
      if (!mUser) return message.channel.send("Utilisateur introuvable !").then(msg => msg.delete(2500));
      message.channel.send(`L'utilisateur ${mUser} a été unmute !`);
        const unmuteEmbed = new RichEmbed()
          .setAuthor(`${mUsered.tag}`, mUsered.displayAvatarURL)
          .setThumbnail(mUsered.displayAvatarURL)
          .setDescription("~Unmute~")
          .setColor("GREEN")
          .addField("Utilisateur unmute", `${mUser} avec l'ID ${mUser.id}`)
          .addField("Unmute par", `${message.author.tag}`)
          .addField("Unmute dans le channel", message.channel)
          .addField("Time", message.createdAt)
          .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
          .setTimestamp();
      
        let mutechannel = message.guild.channels.find(bcnl => bcnl.name === "silent-logs");
        const mutedRole = message.guild.roles.find(mr => mr.name === "muted");
        const memberRole = message.guild.roles.find(mbr => mbr.name === "Membre");
        message.channel.send(`L'utilisateur ${mUser} a été unmute !`);
        await mUser.removeRole(mutedRole.id);
        await mUser.addRole(memberRole.id);
        mutechannel.send(unmuteEmbed);
        
    } catch (e) {
       console.log(e);
    }
  }
}

module.exports = UnMute;