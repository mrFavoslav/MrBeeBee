const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "pravidla",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, message }) {
    const customEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('**📜 PRAVIDLA 📜**')
      .setDescription('Pravidla pro členy serveru.')
      .setImage('https://cdn.discordapp.com/attachments/945363908078747688/1031149428612018276/pravidla.png')
      .addFields(
        { name: '1)', value: 'Chovej se jako normální člověk.', inline: true },
        { name: '2)', value: 'Zákaz žebrání o role.', inline: true },
        { name: '3)', value: 'Je zakázáno otravovat A-Team nesmysly.', inline: true },
        { name: '4)', value: 'Pokud najdeš nějaké nedostatky nebo chyby např. v pravidlech tak je nezneužívej.', inline: true },
        { name: '5)', value: 'Pokud Vás Team vyzve, abyste něco udělali (opustit místnost atd.) jste povinni to neprodleně učinit!', inline: true },
        { name: '6a)', value: 'Je zakázáno pouštět hudbu kromě místnosti tomu vyhrazeným (vyjímka, ostatním v kanálu to nevadí.)', inline: true },
        { name: '6b)', value: 'Je zakázáno pouštět zvuky, nebo cokoliv co by mohlo vadit dalším uživatelům ve vc.', inline: true },
        { name: '7)', value: 'Je zakázáno urážet členy serveru, avšak vulgární mluva je do určité míry pochopitelná.', inline: true },
        { name: '8a)', value: 'Je zakázáno jakkoliv zbytečně pingovat, či spamovat kohokoliv na tomto serveru (vztahuje se i do PM).', inline: true },
        { name: '8b)', value: 'Je zakázáno spamovat a zahlcovat chat.', inline: true },
        { name: '9)', value: 'Je zakázáno mít nevhodný nickname, avatar či status.', inline: true },
        { name: '10)', value: 'Je zakázána PM reklama.', inline: true },
        { name: '11)', value: 'Je zakázáno rozesílat jakékoliv pornografické odkazy, lekací obrázky, nevhodné videa, gify apod. krom místností tomu vyhrazeným (pokud tu taková místnost bude).', inline: true },
        { name: '12)', value: 'Rasismus, homofóbie, nacismus, vnucování ideologií a podobné hovna jsou zakázány. (výjimkou jsou memes které mají účel pobavit).', inline: true },
        { name: '13)', value: 'Je přísně zakázano obcházet tresty.', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'TOS a Guidelines', value: '➣ Platí zde pravidla TOS a Guidelines @everyone\n🔗 https://discordapp.com/terms\n🔗 https://discordapp.com/guidelines\n➣ S ověřením souhlasíš s pravidly tohoto discord serveru a s pravidly TOS a Guidelines\n➣ Také souhlasíš že je ti více než 13 let a můžeš legálně používat discord, pokud AT zjistí že ti ještě 13 let nebylo bude ti udělen ban do doby než ti bude 13 let.', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Ověření ✅', value: 'Ověříš se pomocí zareagování na tuto\nzprávu kliknutím na tlačítko = ✅', inline: true }
        //{ name: 'Verification ✅', value: 'Access to this server is temporarily suspended due to raiders. Contact the owner <@553946762289610785> for access. Thanks.\n\n**⚙️ Working on translating the rules into english.**', inline: true }
      )
      .setTimestamp()
      //.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    message.delete(1)

    const row = new Discord.MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('verify')
          .setLabel('Verify')
          .setStyle('SUCCESS')
          .setEmoji('✅')
      )

    client.channels.cache.get('816664688015179782').messages.fetch('1005793202390966302').then(msg => msg.edit({ embeds: [customEmbed], components: [row] }))
    //client.channels.cache.get('816664688015179782').messages.fetch('1005793202390966302').then(msg => msg.edit({ embeds: [customEmbed], components: []}))
  }
}