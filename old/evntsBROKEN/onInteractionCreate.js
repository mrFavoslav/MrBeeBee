const { Discord, MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed, Client, EmbedBuilder } = require('discord.js');
const { Listener } = require("gcommands");
new Listener({
  event: "interactionCreate",
  name: "interactionCreateBOAGC",
  run: (client, interaction) => {
    const ownerid = client.users.cache.get("553946762289610785");
    //console.log(ownerid)
    if (interaction.member.bot) return;
    if (interaction.isCommand()) return;
    if (!interaction.guild.id === '779693986603991072') return;

    if (interaction.isButton()) {
      if (interaction.customId === 'verify') {
        interaction.deferUpdate()

        const AlrVerifiedEmbed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle('❌ Already Verified')
          .setDescription('🇨🇿 Už jsi ověřen. Není třeba se ověřovat znovu.\n🇬🇧 You are already verified. No need to authenticate again.')
        if (interaction.member.roles.cache.has('816426874967162941')) return interaction.member.send({ embeds: [AlrVerifiedEmbed] }).then(msg => {
          setTimeout(() => msg.delete(), 60000)
        })
        interaction.member.roles.add('816426874967162941')

        const verifyEmbed = new Discord.MessageEmbed()
          .setColor('#00FF0C')
          .setTitle('✅ Verified')
          .setDescription('🇨🇿 Byl jsi ověřen! Nyní máš přístup k serveru!\n🇬🇧 You have been verified! Now you have access to the server!')

        interaction.member.send({ embeds: [verifyEmbed] }).then(msg => {
          setTimeout(() => msg.delete(), 60000)
        })

        if (interaction.member.id === '816656200993079297') {
          console.log('--GargUS byl ověřen.')
        } else {
          const verifyEmbed2 = new Discord.MessageEmbed()
            .setColor('#00FF0C')
            .setTitle('✅ Verified')
            .setDescription(`🇨🇿 ${interaction.member} byl právě ověřen!\n🇬🇧 ${interaction.member} was verified!`)

          const channel = client.channels.cache.get('934124458464141382')
          channel.send({ embeds: [verifyEmbed2] })
        }
      } else if (interaction.customId === 'rulescz') {
        interaction.deferUpdate()

        const row1 = new Discord.MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('rulescz')
              .setLabel('CZ Verze')
              .setStyle('SECONDARY')
              .setEmoji('🇨🇿')
          )
          .addComponents(
            new MessageButton()
              .setCustomId('rulesen')
              .setLabel('EN Version')
              .setStyle('SECONDARY')
              .setEmoji('🇬🇧')
          )
          .addComponents(
            new MessageButton()
              .setCustomId('verify')
              .setLabel('Verify')
              .setStyle('SUCCESS')
              .setEmoji('✅')
          )

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
            //{ name: 'Verification ✅', value: 'You can verify yourself by responding to this message\nby clicking the = ✅ button', inline: true }
            //{ name: 'Verification ✅', value: 'Access to this server is temporarily suspended due to raiders. Contact the owner <@553946762289610785> for access. Thanks.\n\n**⚙️ Working on translating the rules into english.**', inline: true }
          )
          .setTimestamp()
          //.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
          .setFooter(ownerid.username, ownerid.displayAvatarURL({ dynamic: true }))
        //message.delete(1)
        client.channels.cache.get('816664688015179782').messages.fetch('1005793202390966302').then(msg => msg.edit({ embeds: [customEmbed], components: [row1] }))
      } else if (interaction.customId === 'rulesen') {
        interaction.deferUpdate()

        const row1 = new Discord.MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('rulescz')
              .setLabel('CZ Verze')
              .setStyle('SECONDARY')
              .setEmoji('🇨🇿')
          )
          .addComponents(
            new MessageButton()
              .setCustomId('rulesen')
              .setLabel('EN Version')
              .setStyle('SECONDARY')
              .setEmoji('🇬🇧')
          )
          .addComponents(
            new MessageButton()
              .setCustomId('verify')
              .setLabel('Verify')
              .setStyle('SUCCESS')
              .setEmoji('✅')
          )

        const customEmbed = new Discord.MessageEmbed()
          .setColor('#FF0000')
          .setTitle('**📜 RULES 📜**')
          .setDescription('Rules for server members.')
          .setImage('https://cdn.discordapp.com/attachments/945363908078747688/1031149429098561606/rules.png')
          .addFields(
            { name: '1)', value: 'Act like a normal person.', inline: true },
            { name: '2)', value: 'No begging for roles.', inline: true },
            { name: '3)', value: 'It is forbidden to annoy the A-Team with nonsense.', inline: true },
            { name: '4)', value: 'If you find any flaws or mistakes, for example in the rules, do not abuse them.', inline: true },
            { name: '5)', value: 'If the AdminTeam asks you to do something (leave the room, etc.) you are obliged to do it immediately!', inline: true },
            { name: '6a)', value: 'It is forbidden to play music except in the room reserved for it. (Exception only if it doesn\'t bother others.)', inline: true },
            { name: '6b)', value: 'It is forbidden to play sounds or anything that could disturb other users in the vc.', inline: true },
            { name: '7)', value: 'It is forbidden to insult members of the server, but some profanity is allowed.', inline: true },
            { name: '8a)', value: 'It is forbidden to unnecessarily ping or spam anyone on this server (this also applies to PM).', inline: true },
            { name: '8b)', value: 'It is forbidden to spam and flood the chat.', inline: true },
            { name: '9)', value: 'It is forbidden to have an inappropriate nickname, avatar or status.', inline: true },
            { name: '10)', value: 'PM advertising is prohibited.', inline: true },
            { name: '11)', value: 'It is forbidden to send any pornographic links, scary pictures, inappropriate videos, gifs, etc., except in the rooms reserved for that (if there is such a room).', inline: true },
            { name: '12)', value: 'Racism, homophobia, Nazism, the imposition of ideologies and similar shit are prohibited. (the exception is memes that have the purpose of entertaining).', inline: true },
            { name: '13)', value: 'Circumventing penalties is strictly prohibited.', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'TOS a Guidelines', value: '➣ TOS and Guidelines apply here @everyone\n🔗 https://discordapp.com/terms\n🔗 https://discordapp.com/guidelines\n➣ By verifying, you agree to the rules of this discord server and the TOS and Guidelines\n➣ You also agree that you are over 13 years old and can legally use discord, if AT finds that you are not yet 13 years old, you will be banned until you are 13 years old.', inline: true },
            { name: '\u200B', value: '\u200B' },
            //{ name: 'Verification ✅', value: 'Ověříš se pomocí zareagování na tuto\nzprávu kliknutím na tlačítko = ✅', inline: true }
            { name: 'Verification ✅', value: 'You can verify yourself by responding to this message\nby clicking the = ✅ button', inline: true }
            //{ name: 'Verification ✅', value: 'Access to this server is temporarily suspended due to raiders. Contact the owner <@553946762289610785> for access. Thanks.\n\n**⚙️ Working on translating the rules into english.**', inline: true }
          )
          .setTimestamp()
          //.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
          .setFooter(ownerid.username, ownerid.displayAvatarURL({ dynamic: true }))
        //message.delete(1)
        client.channels.cache.get('816664688015179782').messages.fetch('1005793202390966302').then(msg => msg.edit({ embeds: [customEmbed], components: [row1] }))
      }
    } else {
      return;
    }
  },
});
