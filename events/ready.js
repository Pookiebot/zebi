module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(client,member) {
    await this.client.wait(1000);
    this.client.appInfo = await this.client.fetchApplication();
    setInterval(async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 20000);
    let usered = this.client.user
    const zbub = this.client.channels.get("696721284611965069");
    zbub.send(":gear: Le bot est redémarré !");
    this.client.logger.log(
      `Gardien est prêt à espionner ${
        this.client.users.size
      } utilisateurs sur ${this.client.channels.size} salons.`,
      "ready"
    );
  }
};