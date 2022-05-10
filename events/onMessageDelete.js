const Discord = require('discord.js');
const { Event } = require("gcommands")
module.exports = class Ping extends Event {
  constructor(client) {
    super(client, {
      name: "messageDelete",
      once: false,
      ws: false
    })
  }

  async run(client, message) {
    if (message.author.bot) return;
    if (message.channel.id === '934120866185375744') return;
    if (message.channel.id === '945343437677408336') return;
    if (message.channel.id === '949674060294524988') return;
    if (message.guild) {
      console.log(`[${message.author.tag}, ${message.guild.name}, ${message.channel}]-> ${message.content} (Deleted)`)
    } else {
      console.log(`[${message.author.tag} DM]-> ${message.content} (Deleted)`)
      return;
    }

    const logEmbed = new Discord.MessageEmbed()
      .setColor('#C41500')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setFooter(`${message.guild.name}`)
      .setDescription(`**➡️ User ${message.author} deleted:\n\n\`\`\`${message.content}\`\`\`\n🔗 in ${message.channel}**`)
      .setTimestamp()
    const BOAlogchannel = client.channels.cache.get('958302723588112396');
    if ((message.guild.id) === '779693986603991072') {
      BOAlogchannel.send({ embeds: [logEmbed] })
    } else {
      return
    }
  }
};