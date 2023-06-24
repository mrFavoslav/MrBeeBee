const { Discord, EmbedBuilder } = require('discord.js');
const { Listener } = require("gcommands");
new Listener({
  event: "messageDelete",
  name: "messageDeleteBOAGC",
  run: (message) => {
    const ignoredChannels = ['934120866185375744', '945343437677408336', '949674060294524988', '958302723588112396', '817324376281055262', '845015325715202099', '985632566608560208', '945363908078747688', '1117749058518388816'];
    if (message.author.bot || message.guild.id !== '779693986603991072' || ignoredChannels.includes(message.channel.id) || message.channel.parent.id === '833783079134953532') return;

    function send(logEmbed) {
      if ((message.guild.id) === '779693986603991072') {
        const BOAlogchannel = message.client.channels.cache.get('958302723588112396');
        BOAlogchannel.send({ embeds: [logEmbed] })
      } else {
        return;
      }
    }

    if (message.attachments.size > 0) {
      const logEmbed = new EmbedBuilder()
        .setColor('#C41500')
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setFooter({ text: message.guild.name })
        .setDescription(`${message.content ? `**➡️ User ${message.author} deleted message:\n\n\`\`\`${message.content}\`\`\`\n🔗 in ${message.channel}**` : "Only Attachment"}`)
        .setTimestamp()

      let attachmentIndex = 1;
      for (const row of message.attachments) {
        const attachment = row[1];
        logEmbed.addFields({
          name: `Attachment ${attachmentIndex}`,
          value: attachment.url,
        });
        attachmentIndex++;
      }
      send(logEmbed);

    } else if (message.content) {
      const logEmbed = new EmbedBuilder()
        .setColor('#C41500')
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setFooter({ text: message.guild.name })
        .setDescription(`**➡️ User ${message.author} deleted message:\n\n\`\`\`${message.content}\`\`\`\n🔗 in ${message.channel}**`)
        .setTimestamp()
      send(logEmbed);
    }
  },
});