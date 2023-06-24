const { Discord, ActivityType, Client, Attachment, Message, EmbedBuilder } = require('discord.js');
const { Listener } = require("gcommands");
new Listener({
  event: "guildMemberRemove",
  name: "guildMemberRemoveBOAGC",
  run: (client) => {
    if (client.user.bot) return;
    if (client.user.id === '8166562009930792977') {
      console.log('--GargUS left.')
    } else {
        const logEmbed = new EmbedBuilder()
        .setColor('#fc0303')
        .setTitle('🖐️ Goodbye')
        .setDescription(`**${client.user}** opustil **${client.guild.name}**. Počet členů -> ${client.guild.memberCount}.`)
        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }), })
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/945363908078747688/982955966553264178/Member-Left.png');
       if ((client.guild.id) === '779693986603991072') {
        const auditchannel = client.guild.channels.cache.get('958302723588112396');
        const BOAlogchannel2 = client.guild.channels.cache.get('1042100469918609479');
        auditchannel.send({ embeds: [logEmbed] });
       } else {
        return console.log('Error in OGRem EVENT!');
      }
    }
  },
});
