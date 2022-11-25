const { Discord, EmbedBuilder } = require('discord.js');
const { Listener } = require("gcommands");
new Listener({
  event: "messageUpdate",
  name: "messageUpdateBOAGC",
  run: (client, oldMessage, newMessage) => {
    if (newMessage.author.bot) return;
    if (!message.guild.id === '779693986603991072') return;
    if (newMessage.channel.id === '934120866185375744') return;
    if (newMessage.channel.id === '945343437677408336') return;
    if (newMessage.channel.id === '949674060294524988') return;
    if (newMessage.channel.id === '958302723588112396') return;
    if (newMessage.channel.id === '817324376281055262') return;
    if (newMessage.channel.id === '845015325715202099') return;
    if (newMessage.channel.id === '985632566608560208') return;
    if (newMessage.channel.id === '945363908078747688') return;
    if (newMessage.channel.parent.id === '833783079134953532') return;

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
  },
});