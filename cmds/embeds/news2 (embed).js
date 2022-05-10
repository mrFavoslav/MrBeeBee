const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "news2",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, message }) {
    const customEmbed = new Discord.MessageEmbed()
      //.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
      //.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setColor('#0099ff')
      .setTitle('**Novinky ze serveru a okolí.**')
      //.setDescription('Všechny nové featury a věci od posledního oznámení.')
      .setDescription('Pár nejnovějších featur a věcí od posledního oznámení.')
      .setThumbnail('https://cdn.discordapp.com/icons/779693986603991072/85ba883ba6f1c685a86652a35c76b29f.png?size=4096')
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Purge Command', value: 'Na serveru je nyní funkční purge command!', inline: true },
        { name: 'Welcome messages', value: 'WM by nyní měla fungovat! Doufám..', inline: true },
        { name: 'Maintaince Mode', value: 'Tento mód by za chvíli měl skončit a server by se měl vrátit zpět do normálního stavu.', inline: true },
        { name: 'Verifikace', value: 'Bude zde nový způsob verifikace. Až skončí maintaince mode tak se budete muset ověřit aby jste měli přístup k serveru!', inline: true },
        { name: '\u200B', value: '\u200B'},
        { name: 'Web serveru a bota', value: '**https://www.boagc.tk**\nTento server má nyní vlastní Web. Budou na něm informace o našem serveru, membeři, atp.'},
        { name: '**https://www.mrbb.tk**', value: 'MrBB má nyní vlastní web. Budou na něm updaty bota, stav bota, atp.', inline: true },
        { name: '\u200B', value: '\u200B'},
        { name: 'Personální oznámení', value: '**Můj vlastní web**\n**https://www.favoslav.tk**\nNa tomto webu budou moje projekty, odkazy na ně a na jiné věci, (osobní portfolio), atp.' },
      )
      .setTimestamp()
      //.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    message.delete(1)
    client.channels.cache.get('816665000542339092').messages.fetch('945369545177169961').then(msg => msg.edit({ embeds: [customEmbed] }))
  }
}