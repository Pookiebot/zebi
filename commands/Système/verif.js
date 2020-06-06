const Command = require("../../modules/Command.js");
const { RichEmbed } = require("discord.js");

class Verif extends Command {
  constructor(client) {
    super(client, {
      name: "verif",
      description: "activer la Verification",
      usage: "verif",
      category: "Système",
      permLevel: "GA"
    });
  }

  async run(message) {
    try {
      message.delete();

      const checkEmoji = this.client.emojis.find(
        emoji => emoji.name === "checkbot"
      );

      const embed = new RichEmbed()
        .setTitle("Vérification")
        .setColor("RED")
        .addField("・Stop vérification", 
                  `Afin de confirmer que vous n'êtes pas un robot, veuillez cliquer sur la réaction ci-dessous.`
        )
        .addField("・Pourquoi cette vérification ?", 
                  `Notre but est de privilégier le confort et la sécurité des membres sur notre serveur, c'est pour cela que nous avons instauré une vérification manuelle afin de contré toutes attaques robotiques.`
        )
        .setImage("https://media2.giphy.com/media/10p3VEnw29dD44/giphy.gif?cid=19f5b51aca33fd374c65331f6217dd93007f327dde8a0325&rid=giphy.gif")
        .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL);

      message.channel.send(embed).then(async msg => {
        await msg.react(checkEmoji);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Verif;
//bleu <:test3:684479998157258802> jaune <:test2:684480038460069663760> rouge <:test1:684480072333525127>
//rouge <@&696076000240337067> bleu <@&696076006548570187> jaune <@&696076003294052503>