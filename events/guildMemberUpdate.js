const { RichEmbed } = require("discord.js");
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(oldMember, newMember) {
    const channel = this.client.channels.find(c => c.name === "silent-logs");
    let membre = [oldMember.nickname, newMember.nickname];
    if(membre[0] === null)
    {
      membre[0] = oldMember.user.username;
    }
    if(membre[1] === null)
    {
      membre[1] = newMember.user.username;
    }
    if (oldMember.nickname != newMember.nickname)
    {
      const logembed = new RichEmbed ()
        .setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL)
        .setColor("#f7ff3c")
        .setThumbnail(oldMember.user.displayAvatarURL)
        .setDescription(`${oldMember.user.username} à modifié sont profil !`)
        .addField("Username", `${membre[0]} > ${membre[1]}`)
        .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
        .setTimestamp();
      channel.send(logembed);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      const embed = new RichEmbed()
        .setColor('#03224c')
        .setThumbnail(oldMember.user.displayAvatarURL)
        .setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL)
        .setDescription("Role ajouté")
        .addField(`Member:`, `${oldMember.user.tag}`)
        .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
        .setTimestamp();
        for (const role of newMember.roles.map(x => x.id)) { 
          if (!oldMember.roles.has(role))
          { embed.addField(`Role:`, `${oldMember.guild.roles.get(role).name}`); 
          } 
        }
      channel.send(embed);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      const embed = new RichEmbed()
        .setColor('#03224c')
        .setThumbnail(oldMember.user.displayAvatarURL)
        .setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL)
        .setDescription("Role retiré")
        .addField(`Member:`, `${oldMember.user.tag}`)
        .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL)
        .setTimestamp();
        for (const role of oldMember.roles.map(x => x.id)) { 
          if (!newMember.roles.has(role))
        { embed.addField(`Role:`, `${oldMember.guild.roles.get(role).name}`); 
      }
          console.log(oldMember);
    }
    channel.send(embed);
    }
  }
};