const Discord = require('discord.js');
const { Event } = require("gcommands")
module.exports = class Ping extends Event {
    constructor(client) {
        super(client, {
      name: "ready",
      once: false,
      ws: false
    })
  }

  async run(client, message) {
    const botvers = require('../package.json');
    console.log(`Přihlášen - ${client.user.tag}!`)
    
    client.user.setActivity(`${botvers.state} ${botvers.version}${botvers.stage}`, {
      type: 'STREAMING',
      url: 'https://www.twitch.tv/Favoslav_'
    });

    /*client.user.setActivity(`Happy new year! 🎉`, {
      type: 'STREAMING',
      url: 'https://www.twitch.tv/Favoslav_'
    });*/

    const keepAlive = require('../server.js');
    keepAlive();

    const util = require('minecraft-server-util');
    setInterval(function() {
      util.status('34.89.238.119')
        .then((result) => {
          const onembed = new Discord.MessageEmbed()
            .setColor('#00FF04')
            .setTitle('🟢 Status: Online')
            .setDescription('\u200B\n🔄 Status se obnovuje každých 5s.\n\u200B')
            .setThumbnail("https://cdn.discordapp.com/attachments/817323618576760853/923635592791748618/favicon.png")
            .addField('💻 IP:', `mc.furskomunita.cz`)
            .addField('🗞️ Verze:', `${result.version.name}`)
            .addField('🔢 Online Hráči:', `${result.players.online}`)
            .addField('📈 Max. Počet Hráčů:', `${result.players.max}`)
            .addField('📶 Motd:', `${result.motd.clean}`)
            .addField('🗺️ DynMapa:', `http://mc.furskomunita.cz`)
            .setTimestamp()

          client.channels.cache.get('836166237729587240').messages.fetch('923636305248784468').then(msg => msg.edit({ embeds: [onembed]}))
            })
        .catch((error) => {
          const offembed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('🔴 Status: Offline')
            .setDescription('\u200B\n🔄 Status se obnovuje každých 5s.\n\u200B')
            .setThumbnail('https://cdn.discordapp.com/attachments/817323618576760853/923635592791748618/favicon.png')
            .addField('💻 IP:', `🚫 -`)
            .addField('🗞️ Verze:', `🚫 -`)
            .addField('🔢 Online Hráči:', `🚫 -`)
            .addField('📈 Max. Počet Hráčů:', `🚫 -`)
            .addField('📶 Motd:', `🚫 -`)
            .addField('🗺️ DynMapa:', `🚫 -`)
            .setTimestamp()

            client.channels.cache.get('836166237729587240').messages.fetch('923636305248784468').then(msg => msg.edit({ embeds: [offembed] }))
            });
    }, 5000);

    setInterval(function() {
               util.status('play.ownyk.ml')
        .then((result) => {
          const onembed = new Discord.MessageEmbed()
            .setColor('#00FF04')
            .setTitle('🟢 Status: Online')
            .setDescription('\u200B\n🔄 Status se obnovuje každých 5s.\n\u200B')
            .setThumbnail('https://cdn.discordapp.com/icons/915618656275275846/67ffd0d0aa0986baf3d2fe0ec3a1e835.png?size=4096')
            .addField('💻 IP:', `play.ownyk.ml`)
            .addField('🗞️ Verze:', `${result.version.name}`)
            .addField('🔢 Online Hráči:', `${result.players.online}`)
            .addField('📈 Max. Počet Hráčů:', `${result.players.max}`)
            .addField('📶 Motd:', `${result.motd.clean}`)
            .addField('🗺️ Dočásná DynMap DNS:', `http://map.ownyk.ml`)
            .setTimestamp()

          client.channels.cache.get('921105849638862888').messages.fetch('923632304411267092').then(msg => msg.edit({ embeds: [onembed] }))
        })
          /*.then(async (response) => {
          const onembed = new Discord.MessageEmbed()
            .setColor('#ffe600')
            .setTitle('🟡 Status: Maintained')
            .setDescription('\u200B\n🔄 Status se obnovuje každých 5s.\n\u200B')
            .setThumbnail('https://cdn.discordapp.com/icons/915618656275275846/552d8b53362460c42e99078f3ee4eee5.png?size=4096')
            .addField('💻 Dočasná IP:', `${response.host}`)
            .addField('🗞️ Verze:', `${response.version}`)
            .addField('🔢 Online Hráči:', `${response.onlinePlayers}`)
            .addField('📈 Max. Počet Hráčů:', `${response.maxPlayers}`)
            .addField('🗺️ Dočásná DynMap DNS:', `http://map.ownyk.ml`)
            .setTimestamp()

          client.channels.cache.get('921105849638862888').messages.fetch('923632304411267092').then(msg => msg.edit({ embeds: [onembed] }))
        })*/
        .catch((error) => {
          const offembed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('🔴 Status: Offline')
            .setDescription('\u200B\n🔄 Status se obnovuje každých 5s.\n\u200B')
            .setThumbnail('https://cdn.discordapp.com/icons/915618656275275846/67ffd0d0aa0986baf3d2fe0ec3a1e835.png?size=4096')
            .addField('💻 IP:', `🚫 -`)
            .addField('🗞️ Verze:', `🚫 -`)
            .addField('🔢 Online Hráči:', `🚫 -`)
            .addField('📈 Max. Počet Hráčů:', `🚫 -`)
            .addField('📶 Motd:', `🚫 -`)
            .addField('🗺️ DynMapa:', `🚫 -`)
            .setTimestamp()

          client.channels.cache.get('921105849638862888').messages.fetch('923632304411267092').then(msg => msg.edit({ embeds: [offembed] }))
        });
    }, 5000);
  }
}