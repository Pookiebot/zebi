const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");
const ms = require("ms");
class Mute extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      description: "Mute un utilisateur définitivement",
      usage: "mute",
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
      const mReason = args.join(" ").slice(25);
      if(!mReason) return message.channel.send("aucune raison spécifié").then(msg => msg.delete(2500));
      if(muteTime === "∞") {
        const muteEmbed = new RichEmbed()
          .setAuthor(`${mUsered.tag}`, mUsered.displayAvatarURL)
          .setThumbnail(mUsered.displayAvatarURL)
          .setDescription("~Muted~")
          .setColor("#f7ff3c")
          .addField("Utilisateur mute", `${mUser} avec l'ID ${mUser.id}`)
          .addField("Mute par", `${message.author.tag}`)
          .addField("Mute dans le channel", message.channel)
          .addField("Time", message.createdAt)
          .addField("Raison", mReason)
          .addField("Durée", "∞")
          .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
          .setTimestamp();

        let mutechannel = message.guild.channels.find(bcnl => bcnl.name === "silent-logs");
        const mutedRole = message.guild.roles.find(mr => mr.name === "muted");
        const memberRole = message.guild.roles.find(mbr => mbr.name === "Membre");
        await mUser.addRole(mutedRole.id);
        await mUser.removeRole(memberRole.id);
        message.channel.send(`L'utilisateur ${mUser} a été mute <raison : ${mReason}> pour une durée indéterminé.`).then(m => m.delete(5000));
        mutechannel.send(muteEmbed);
      } else {
        const softmuteEmbed = new RichEmbed()
          .setAuthor(`${mUsered.tag}`, mUsered.displayAvatarURL)
          .setThumbnail(mUsered.displayAvatarURL)
          .setDescription("~Muted~")
          .setColor("#f7ff3c")
          .addField("Utilisateur mute", `${mUser} avec l'ID ${mUser.id}`)
          .addField("Mute par", `${message.author.tag}`)
          .addField("Mute dans le channel", message.channel)
          .addField("Time", message.createdAt)
          .addField("Raison", mReason)
          .addField("Durée", muteTime)
          .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
          .setTimestamp();

        let mutedchannel = message.guild.channels.find(bcnl => bcnl.name === "silent-logs");
        const mutedRole = message.guild.roles.find(mr => mr.name === "muted");
        const memberRole = message.guild.roles.find(mbr => mbr.name === "Membre");
        message.channel.send(`L'utilisateur ${mUser} a été mute <raison : ${mReason}> pour une durée ${args[1]}.`).then(m => m.delete(5000));
        await mUser.addRole(mutedRole.id);
        await mUser.removeRole(memberRole.id);
        mutedchannel.send(softmuteEmbed);
        setTimeout(function() { 
          mUser.removeRole(mutedRole.id);
          mUser.addRole(memberRole.id);
          message.channel.send(`L'utilisateur ${mUser} n'est plus mute !`);
        }, ms(muteTime));
      }
    } catch (e) {
       console.log(e);
    }
  }
}

module.exports = Mute;