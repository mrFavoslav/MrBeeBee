const { Discord, EmbedBuilder } = require('discord.js');
const { Listener } = require("gcommands");
new Listener({
  event: "messageDelete",
  name: "messageDeleteBOAGC",
  run: (client, message) => {
    const ignoredChannels = ['934120866185375744', '945343437677408336', '949674060294524988', '958302723588112396', '817324376281055262', '845015325715202099', '985632566608560208', '945363908078747688'];
    if (message.author.bot || message.guild.id !== '779693986603991072' || ignoredChannels.includes(message.channel.id) || message.channel.parent.id === '833783079134953532') return;
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
  },
});