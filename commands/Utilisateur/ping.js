const Command = require("../../modules/Command.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Latence du bot + reponse API.",
      usage: "ping",
      guildOnly: true
    });
  }

  async run(message) {
    try {
      message.delete()
      const msg = await message.channel.send("Ping!");
      msg.edit(`Pong! Latence bot: ${msg.createdTimestamp - message.createdTimestamp}ms.\n API: ${Math.round(this.client.ping)}ms.`);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ping;