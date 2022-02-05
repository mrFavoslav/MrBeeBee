const Discord = require('discord.js');
const { Event } = require("gcommands")
module.exports = class Ping extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate",
            once: false,
            ws: false
        })
    }

    async run (client, interaction) {
     if (!interaction.isButton()) return;
      if (interaction.customId === 'verify') {
        interaction.deferUpdate()
        
        const AlrVerifiedEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('❌ Already Verified')
        .setDescription('Už jsi ověřen. Není třeba se ověřovat znovu.')
       if (interaction.member.roles.cache.has('816426874967162941')) return interaction.member.send({ embeds: [AlrVerifiedEmbed]}).then(msg => {
                    setTimeout(() => msg.delete(), 60000)
                })
         interaction.member.roles.add('816426874967162941')
        
        const verifyEmbed = new Discord.MessageEmbed()
        .setColor('#00FF0C')
        .setTitle('✅ Verified')
        .setDescription('Byl jsi ověřen! Nyní máš přístup k serveru!')

        interaction.member.send({ embeds: [verifyEmbed]}).then(msg => {
                    setTimeout(() => msg.delete(), 60000)
                })

        const verifyEmbed2 = new Discord.MessageEmbed()
        .setColor('#00FF0C')
        .setTitle('✅ Verified')
        .setDescription(`${interaction.member} byl právě ověřen!`)

        const channel = client.channels.cache.get('934124458464141382')
        if (!interaction.member.roles.cache.has('816426874967162941')) return channel.send({ embeds: [verifyEmbed2] })
      } 
    }
}