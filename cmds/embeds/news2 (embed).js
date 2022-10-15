const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "news2",
      description: "Vytvoří custom embed zprávu.",
      //userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, message }) {
    const customEmbed = new Discord.MessageEmbed()
      .setColor('#d61e1e')
      .setTitle('**Survival Server pro IT1A**')
      .setDescription('Oznámení o provozu serveru. @everyone')
      .setThumbnail('https://cdn.discordapp.com/icons/779693986603991072/85ba883ba6f1c685a86652a35c76b29f.png?size=4096')
      .addFields(
        { name: 'Význam serveru', value: 'Společně s panem Danem a panem Pavlem jsme se rozhodli vytvořit Survival Server. Tento server poběží na verzi 1.16.5 24/7 s restarty ve tři hodiny ráno. Na serveru je také dynmapa http://map.boagc.tk/ a předgenerovaný svět, který je omezen borderem 6000 blocků do každého směru v každé dimenzi. Svět se popřídě může zvětšit. Také se plánuje pozdější rebuild na nejnovší verzi minecraftu (nyní 1.19.2).', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Invite na server', value: 'Na server jsou zváni všichni z třídy IT1A. Pokud někdo chce, tak může na server přijít i např. váš kamarád. Jen ať nedělá píčoviny. Děkuji.' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Dodatečné informace', value: 'Další informace máte v kanálu pro pravidla -> <#1028269860209311754> a kanálu pro status serveru (jako např. ip) -> <#1028218159846674452>. \n\n**SERVER SE SPUSTÍ V 14:30!!**' },
      )
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    message.delete(1)
    //client.channels.cache.get('816665000542339092').messages.fetch('982962641746153562').then(msg => msg.edit({ embeds: [customEmbed] }))
    message.channel.send({ embeds: [customEmbed] });
  }
}