const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ping",
      description: "Ukáže ping bota.",
    });
  }

  async run({ client, respond, interaction, message }) {
    let ping =
      Date.now() - (interaction ? interaction.createdAt : message.createdAt);
      const pingembed = new Discord.MessageEmbed()
      .setTitle('⏳ Ping')
      .addFields(
        { name: '🤖 Můj Ping', value: `${ping}ms`, inline: true },
        { name: '🌐 WebSocket Ping', value: `${client.ws.ping}ms`, inline: true },
      )
      .setTimestamp()

      respond(pingembed)
    };
  }