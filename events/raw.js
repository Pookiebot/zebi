const { RichEmbed } = require("discord.js");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(payload) {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(payload.t)) return;
    const channel = this.client.channels.get(payload.d.channel_id);
    if (channel.messages.has(payload.d.message_id)) return;
    channel.fetchMessage(payload.d.message_id).then(message => {
      const emoji = payload.d.emoji.id ? `${payload.d.emoji.name}:${payload.d.emoji.id}` : payload.d.emoji.name;
      const reaction = message.reactions.get(emoji);
      if (reaction) reaction.users.set(payload.d.user_id, this.client.users.get(payload.d.user_id));
      if (payload.t === 'MESSAGE_REACTION_ADD') { 
        this.client.emit('messageReactionAdd', reaction, this.client.users.get(payload.d.user_id));
      }
      if (payload.t === 'MESSAGE_REACTION_REMOVE') {
        this.client.emit('messageReactionRemove', reaction, this.client.users.get(payload.d.user_id)); 
      }
    })
  }
};