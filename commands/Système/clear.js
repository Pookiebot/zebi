const Command = require("../../modules/Command.js");

class Clear extends Command {
  constructor(client) {
    super(client, {
      name: "clear",
      description: " Nettoyer un nombre de message spécifiés..",
      usage: "clear",
      guildOnly: true,
      category: "Système",
      permLevel: "GM"
    });
  }

  async run(message, args) {
    try {
      message.delete()
      const emojicheck = this.client.emojis.find(emoji => emoji.name === "checkbot");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${emojicheck} j'ai supprimé ***${args[0]} messages*** pour vous !`).then(msg => msg.delete(5000));
        })
    } catch (e) {
        console.log(e);
    }
  }
}

module.exports = Clear;