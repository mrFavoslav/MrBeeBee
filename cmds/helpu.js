const Discord = require('discord.js');
const index = require('../index.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "helpu",
      description: "Help kat. - Utilities.",
    });
  }

  async run({ respond, message, client }) {
    const helpembed = new Discord.MessageEmbed()
      .setColor('#cc3300')
      .setTitle('**Help kat. - Utilities.**')
      .addField('Latence Bota', `Použití: ${index.prefix}ping`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()


    respond(helpembed)
  }
}