const Command = require("../../modules/Command.js");

class Reboot extends Command {
  constructor(client) {
    super(client, {
      name: "reboot",
      description: "Eteindre et relancer le bot.",
      usage: "reboot",
      guildOnly: true,
      category: "Système",
      permLevel: "GA"
    });
  }

  async run(message) {
    try {
      message.delete();
      const channel = this.client.channels.get("696721284611965069");
      await channel.send (":gear: le bot est en train de se relancer.");
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });
      process.exit(1);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Reboot;