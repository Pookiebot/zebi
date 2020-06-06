const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");

class Allroles extends Command {
  constructor(client) {
    super(client, {
      name: "empire",
      description: "Embed choisi ton empire",
      usage: "empire",
      category: "Système",
      permLevel: "GA"
    });
  }

  async run(message) {
    try {
      message.delete();
      const yellowRole = message.guild.roles.get("696076003294052503");
      const redRole = message.guild.roles.get("696076000240337067");
      const blueRole = message.guild.roles.get("696076006548570187");

      const yellowEmoji = this.client.emojis.find(
        emoji => emoji.name === "test2"
      );
      const redEmoji = this.client.emojis.find(
        emoji => emoji.name === "test1"
      );
       const blueEmoji = this.client.emojis.find(
        emoji => emoji.name === "test3"
      );

      const embed = new RichEmbed()
        .setTitle("Empire")
        .setDescription(
          "Clique sur une des reaction ci dessous pour pouvoir rejoindre les channels propres a ton empire."
        )
        .setColor("GREEN")
        .addField(
          "Choisi ton empire :",
          `
          ${yellowEmoji} - ${yellowRole}
          ${redEmoji} - ${redRole}
          ${blueEmoji} - ${blueRole}
          `
        )
        .setFooter(`${this.client.user.tag}`);

      message.channel.send(embed).then(async msg => {
        await msg.react(yellowEmoji);
        await msg.react(redEmoji);
        await msg.react(blueEmoji);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Allroles;
//bleu <:test3:684479998157258802> jaune <:test2:684480038460069663760> rouge <:test1:684480072333525127>
//rouge <@&696076000240337067> bleu <@&696076006548570187> jaune <@&696076003294052503>