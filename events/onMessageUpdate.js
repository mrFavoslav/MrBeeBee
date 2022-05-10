const Discord = require('discord.js');
const { Event } = require("gcommands")
module.exports = class Ping extends Event {
  constructor(client) {
    super(client, {
      name: "messageUpdate",
      once: false,
      ws: false
    })
  }

  async run(client, oldMessage, newMessage) {
    if (newMessage.author.bot) return;
    if (newMessage.author.id === '832683753259270174') return;
    if (newMessage.channel.id === '934120866185375744') return;
    if (newMessage.channel.id === '945343437677408336') return;
    if (newMessage.channel.id === '949674060294524988') return;
    
    if (oldMessage.content === newMessage.content) return;
    oldMessage.fetch()
      .catch(error => {
        console.log(error);
      });

    if (newMessage.guild) {
      console.log(`[${newMessage.author.tag}, ${newMessage.guild.name}, ${newMessage.channel}]-> ${oldMessage.content} to ${newMessage.content}`)
    } else {
      console.log(`[${newMessage.author.tag}]-> ${oldMessage.content} to ${newMessage.content}`)
      return;
    }

    const logEmbed = new Discord.MessageEmbed()
      .setColor('#21C400')
      .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL({ dynamic: true }))
      .setFooter(`${newMessage.guild.name}`)
      .setDescription(`**➡️ User ${newMessage.author} edited:\n\n\`\`\`${oldMessage.content}\`\`\`\nto\n\n\`\`\`${newMessage.content}\`\`\`\n🔗 in ${newMessage.channel}**`)
      .setTimestamp()
    const BOAlogchannel = client.channels.cache.get('958302723588112396');
    if ((newMessage.guild.id) === '779693986603991072') {
      BOAlogchannel.send({ embeds: [logEmbed] })
    } else {
      return
    }
  }
};