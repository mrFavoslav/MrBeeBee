const Discord = require('discord.js');
const prefix = "b";
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
      .addField('**Mute**', `Použití: ${prefix}mute <@uživatel>`)
      .addField('**Unmute**', `Použití: ${prefix}unmute <@uživatel>`)
      .addField('**Ban**', `Použití: ${prefix}ban <@uživatel> <reason>`)
      .addField('**Kick**', `Použití: ${prefix}kick <@uživatel> <reason>`)
      .addField('**Warn**', `Použití: ${prefix}warn <@uživatel> <reason>`)
      .addField('**Strike**', `Použití: ${prefix}strike <@uživatel> <reason>`)
      .addField('**Purge/Clear**', `Použití: ${prefix}clear nebo ${prefix}purge <@uživatel>`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    respond(helpembed)
  }
}