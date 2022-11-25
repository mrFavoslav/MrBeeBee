const Discord = require('discord.js');
const { Event } = require("gcommands")
module.exports = class Ping extends Event {
  constructor(client) {
    super(client, {
      name: "messageCreate",
      once: false,
      ws: false
    })
  }

  async run(client, message) {
    if (message.author.bot) return;
    if (message.channel.id === '934120866185375744') return;
    if (!message.guild.id === '779693986603991072') return;
    if (message.channel.id === '945343437677408336') return;
    if (message.channel.id === '949674060294524988') return;
    if (message.channel.id === '958302723588112396') return;
    if (message.channel.id === '817324376281055262') return;
    if (message.channel.id === '845015325715202099') return;
    if (message.channel.id === '985632566608560208') return;
    if (message.channel.id === '945363908078747688') return;
    if (message.channel.id === '1042100469918609479') return;
    if (message.channel.parent.id === '833783079134953532') return;
    message.fetch()
      .catch(error => {
        console.log('Something went wrong when fetching the message: ', error);
      });
    if (message.guild) {
      console.log(`[${message.author.tag}, ${message.guild.name}, ${message.channel}]-> ${message.content}`)
    } else {
      console.log(`[${message.author.tag}]-> ${message.content}`)
      return;
    }

    const logEmbed = new Discord.MessageEmbed()
      .setColor('#21C400')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setFooter(`${message.guild.name}`)
      .setDescription(`**➡️ User ${message.author} wrote:\n\n\`\`\`${message.content}\`\`\`\n🔗 in ${message.channel}**`)
      .setTimestamp()
    const BOAlogchannel = client.channels.cache.get('958302723588112396');
    if ((message.guild.id) === '779693986603991072') {
      BOAlogchannel.send({ embeds: [logEmbed] })
    } else {
      return
    }
  }
};