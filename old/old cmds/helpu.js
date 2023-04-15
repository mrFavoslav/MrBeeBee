const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json')
const prefix = config.prefix

module.exports = {
    name: 'helpu',
    description: "Help menu - Utilities.",
    aliases: [],
    execute(client, message, args, Discord){
      const helpembed = new Discord.MessageEmbed()
  .setColor('#cc3300')
  .setTitle('**Help Menu** - Utilities.')
  .addField('Latence Bota', `Použití: ${prefix}ping`)
  .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
  .setTimestamp()

        message.channel.send(helpembed)
           console.log(` -- ${message.author.username} spustil cmd helpu!`);
        }
      };