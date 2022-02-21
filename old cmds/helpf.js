const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json')
const prefix = config.prefix

module.exports = {
    name: 'helpf',
    description: "Help menu - Fun.",
    aliases: [],
    execute(client, message, args, Discord){
      const helpembed = new Discord.MessageEmbed()
  .setColor('#cc3300')
  .setTitle('**Help Menu** - Fun.')
  .addField('How Gay', `Použití: ${prefix}howgay <@uživatel>`)
  .addField('Avatar', `Použití: ${prefix}avatar <@uživatel>`)
  .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
  .setTimestamp()

        message.channel.send(helpembed)
           console.log(` -- ${message.author.username} spustil cmd helpf!`);
        }
      };