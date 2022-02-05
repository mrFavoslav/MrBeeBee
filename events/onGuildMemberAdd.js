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
  
  async run( client, member ) {
    if (member.guild.fetch('816656200993079297')) {
      console.log('--GargUS joined.')
      return;
      }
    
    const owner = client.users.cache.get(`${member.guild.ownerId}`); 
    const joinembed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('🖐️ Welcome')
      .setDescription(`Ahoj ${member}! Vítej na **${member.guild.name}**! Je nás zde ${member.guild.memberCount}! Doufám že si to zde užiješ! Majitelem serveru je ${owner}! Přečti si prosím <#816664688015179782>! Díky.`)
      .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setImage('https://cdn.discordapp.com/attachments/817323618576760853/828679554851143701/NewUser.png')
      
    const channel = client.channels.cache.get('828674300969484298');
    channel.send({ embeds: [joinembed] })
  }
}