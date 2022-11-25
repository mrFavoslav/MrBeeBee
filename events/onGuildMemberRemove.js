const Discord = require('discord.js');
const { Event } = require("gcommands")
module.exports = class Ping extends Event {
  constructor(client) {
    super(client, {
      name: "guildMemberRemove",
      once: false,
      ws: false
    })
  }

  async run(client, member) {
    if (member.bot) return;
    if (member.id === '816656200993079297') {
      console.log('--GargUS left.')
    } else {
        const logEmbed = new Discord.MessageEmbed()
        .setColor('#fc0303')
        .setTitle('🖐️ Goodbye')
        .setDescription(`**${member}** opustil **${member.guild.name}**. Počet členů -> ${member.guild.memberCount}.`)
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/945363908078747688/982955966553264178/Member-Left.png')
       if ((member.guild.id) === '779693986603991072') {
        const BOAlogchannel = client.channels.cache.get('958302723588112396');
        BOAlogchannel.send({ embeds: [logEmbed] })
       } else {
        return
      }
    }
  }
}
