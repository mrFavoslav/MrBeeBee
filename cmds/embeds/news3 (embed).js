const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "news3",
      description: "Vytvoří custom embed zprávu.",
      //userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, message }) {
    const customEmbed = new Discord.MessageEmbed()
      .setColor('#d61e1e')
      .setTitle('**Pravidla pro Survival Server IT1A**')
      .setDescription('Pravidla provozu serveru.')
      .setThumbnail('https://cdn.discordapp.com/icons/779693986603991072/85ba883ba6f1c685a86652a35c76b29f.png?size=4096')
      .addFields(
        { name: '1)', value: 'Prosím negriefujte ostatním hráčům jejich stavby.' },
        { name: '2)', value: 'Necheatujte. XRay a i ostatní zvýhodnění hry jsou ZAKÁZÁNY!' },
        { name: '3)', value: 'Nekraďte ostatním hráčům jejich věci.' },
        { name: '4)', value: 'Chovejte se na serveru celkově slušně. Myslím že není třeba nic více vysvětlovat.' },
        { name: '5)', value: 'Do ENDu se půjde společně. Kdy a kde se řekne předem.' },
        { name: '6)', value: 'Portály pro nether travel budou na výšce 100 na nether straně.' },
      )
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    message.delete(1)
    //client.channels.cache.get('816665000542339092').messages.fetch('982962641746153562').then(msg => msg.edit({ embeds: [customEmbed] }))
    message.channel.send({ embeds: [customEmbed] });
  }
}