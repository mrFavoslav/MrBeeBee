const Discord = require('discord.js');
const { Event } = require("gcommands")
module.exports = class Ping extends Event {
  constructor(client) {
    super(client, {
      name: "guildMemberAdd",
      once: false,
      ws: false
    })
  }

  async run(client, member) {
    /*const mem = client.users.cache.get("927613022934011925");
    console.log(mem)
    console.log(mem.tag)
    console.log(mem.username)*/
    if (member.bot) return;
    if (member.id === '816656200993079297') {
      console.log('--GargUS joined.')
    } else {
      const owner = client.users.cache.get(`${member.guild.ownerId}`);
      const joinembed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('🖐️ Welcome')
        //.setDescription(`Ahoj <@927613022934011925>! Vítej na **${member.guild.name}**! Je nás zde ${member.guild.memberCount}! Doufám že si to zde užiješ! Majitelem serveru je ${owner}! Přečti si prosím <#816664688015179782>! Díky.`)
        .setDescription(`Ahoj ${member}! Vítej na **${member.guild.name}**! Je nás zde ${member.guild.memberCount}! Doufám že si to zde užiješ! Majitelem serveru je ${owner}! Přečti si prosím <#816664688015179782>! Díky.`)
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        //.setAuthor(mem.tag, mem.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/945363908078747688/982955966314201108/New-Member.png')
      if ((member.guild.id) === '779693986603991072') {
      const channel = client.channels.cache.get('828674300969484298');
      channel.send({ embeds: [joinembed] })
      } else {
        return
      }
    }
  }
}
