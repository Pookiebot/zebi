const { RichEmbed } = require("discord.js");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(member) {
    const membered = await this.client.fetchUser(member);
    const channel = member.guild.channels.find(ch => ch.name === "lobby");
    const logchan = member.guild.channels.find(lch => lch.name === "silent-logs");
    const membcount = member.guild.channels.get("696725216348471366");
    membcount.setName(`Membres : ${member.guild.members.filter(m => !m.bot).size -1}`)
    const onlinemember = member.guild.channels.get("696759097864749076");
    onlinemember.setName(`En ligne : ${member.guild.members.filter(m => m.presence.status != 'offline').size -1}`)
    const memberaddembed = new RichEmbed()
      .setAuthor(`${membered.tag}`, membered.displayAvatarURL)
      .setColor("RED")
      .setThumbnail(membered.displayAvatarURL)
      .setDescription(`📤 ${member}, a quitté le serveur !`)
      .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
      .setTimestamp();
    channel.send(`Aurevoir, ${member}`);
    logchan.send(memberaddembed);
  }
};