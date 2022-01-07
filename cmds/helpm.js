const Discord = require('discord.js');
const index = require('../index.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "helpm",
      description: "Help Kat. - Moderation",
      userRequiredPermissions: 'MANAGE_MESSAGES' || 'KICK_MEMBERS' || 'BAN_MEMBERS' || 'ADMINISTRATOR',
    });
  }

  async run({ respond, message, client }) {
    const helpembed = new Discord.MessageEmbed()
      .setColor('#cc3300')
      .setTitle('**Help Kat. - Moderation.**')
      .addField('**Mute**', `Použití: ${index.prefix}mute <@uživatel>`)
      .addField('**Unmute**', `Použití: ${index.prefix}unmute <@uživatel>`)
      .addField('**Ban**', `Použití: ${index.prefix}ban <@uživatel> <reason>`)
      .addField('**Kick**', `Použití: ${index.prefix}kick <@uživatel> <reason>`)
      .addField('**Warn**', `Použití: ${index.prefix}warn <@uživatel> <reason>`)
      .addField('**Strike**', `Použití: ${index.prefix}strike <@uživatel> <reason>`)
      .addField('**Purge/Clear**', `Použití: ${index.prefix}clear nebo ${index.prefix}purge <@uživatel>`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    respond(helpembed)
  }
}