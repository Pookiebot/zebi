module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(messageReaction, user) {
    const message = messageReaction.message;
    const member = message.guild.members.get(user.id)
    const channel = message.guild.channels.find(c => c.name === "test")
    const verif = message.guild.channels.get("696138063222407238")
    if (member.user.bot) return;
    
    const yellowRole = message.guild.roles.get("696076003294052503");
    const redRole = message.guild.roles.get("696076000240337067");
    const blueRole = message.guild.roles.get("696076006548570187");
    const verifRole = message.guild.roles.get("680752954063716354");
    
    if (["test1", "test2", "test3"].includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
      switch (messageReaction.emoji.name) {
          case "test1":
            member.removeRole(redRole);
            message.channel.send(`Le role ${redRole.name} a été retiré  !`).then(msg => msg.delete(2500));
          break;
          case "test2":
            member.removeRole(yellowRole);
            message.channel.send(`Le rôle ${yellowRole.name} à été retiré !`).then(msg => msg.delete(2500));
          break;
          case "test3":
            member.removeRole(blueRole);
            message.channel.send(`Le rôle ${blueRole.name} a été retiré !`).then(msg => msg.delete(2500));
          break;
      }
    }
    if (["checkbot"].includes(messageReaction.emoji.name) && message.channel.id === verif.id) {
      switch (messageReaction.emoji.name) {
        case "checkbot":
          member.removeRole(verifRole);
          message.channel.type === (`"dm"`) + message.member.sendMessage("Veuillez de nouveau faire la vérification.")
      }
    }
  }
};

//680752954063716354