const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json')
const prefix = config.prefix

module.exports = {
    name: 'helpm',
    description: "Help menu - Moderation.",
    aliases: [],
    execute(client, message, args, Discord){

      if (!message.member.hasPermission(['MANAGE_MESSAGES' || 'KICK_MEMBERS' || 'BAN_MEMBERS' || 'ADMINISTRATOR'])) return //message.channel.send("tst.1-hm")

      const helpembed = new Discord.MessageEmbed()
  .setColor('#cc3300')
  .setTitle('**Help Menu - Moderation.**')
  .addField('**Mute**', `Použití: ${prefix}mute <@uživatel>`)
  .addField('**Unmute**', `Použití: ${prefix}unmute <@uživatel>`)
  .addField('**Ban**', `Použití: ${prefix}ban <@uživatel> <reason>`)
  .addField('**Kick**', `Použití: ${prefix}kick <@uživatel> <reason>`)
  .addField('**Warn**', `Použití: ${prefix}warn <@uživatel> <reason>`)
  .addField('**Strike**', `Použití: ${prefix}strike <@uživatel> <reason>`)
  .addField('**Purge/Clear**', `Použití: ${prefix}clear nebo ${prefix}purge <@uživatel>`)
  .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
  .setTimestamp()

        message.channel.send(helpembed)
           console.log(` -- ${message.author.username} spustil cmd helpm!`);
        }
      };