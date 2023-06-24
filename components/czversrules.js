const { Component, ComponentType } = require('gcommands');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
new Component({
	name: 'czversrules',
	type: [ComponentType.BUTTON],
	run: async (ctx) => {

		const channel = await ctx.client.channels.fetch('816664688015179782');
		const message = await channel.messages.fetch('1096869424843215060');

		const customEmbed = message.embeds[0];

		customEmbed.data.title = '**📜 PRAVIDLA 📜**';
		customEmbed.data.description = 'Pravidla pro členy serveru.';
		customEmbed.data.image.url = "https://cdn.discordapp.com/attachments/945363908078747688/1031149428612018276/pravidla.png";
		customEmbed.fields[0].name = '1)';
		customEmbed.fields[0].value = 'Chovej se jako normální člověk.';
		customEmbed.fields[0].inline = true;
		customEmbed.fields[1].name = '2)';
		customEmbed.fields[1].value = 'Zákaz žebrání o role.';
		customEmbed.fields[1].inline = true;
		customEmbed.fields[2].name = '3)';
		customEmbed.fields[2].value = 'Je zakázáno otravovat A-Team nesmysly.';
		customEmbed.fields[2].inline = true;
		customEmbed.fields[3].name = '4)';
		customEmbed.fields[3].value = 'Pokud najdeš nějaké nedostatky nebo chyby např. v pravidlech tak je nezneužívej.';
		customEmbed.fields[3].inline = true;
		customEmbed.fields[4].name = '5)';
		customEmbed.fields[4].value = 'Pokud Vás Team vyzve, abyste něco udělali (opustit místnost atd.) jste povinni to neprodleně učinit!';
		customEmbed.fields[4].inline = true;
		customEmbed.fields[5].name = '6a)';
		customEmbed.fields[5].value = 'Je zakázáno pouštět hudbu kromě místnosti tomu vyhrazeným (vyjímka, ostatním v kanálu to nevadí.)';
		customEmbed.fields[5].inline = true;
		customEmbed.fields[6].name = '6b)';
		customEmbed.fields[6].value = 'Je zakázáno pouštět zvuky, nebo cokoliv co by mohlo vadit dalším uživatelům ve vc.';
		customEmbed.fields[6].inline = true;
		customEmbed.fields[7].name = '7)';
		customEmbed.fields[7].value = 'Je zakázáno urážet členy serveru, avšak vulgární mluva je do určité míry pochopitelná.';
		customEmbed.fields[7].inline = true;
		customEmbed.fields[8].name = '8a)';
		customEmbed.fields[8].value = 'Je zakázáno jakkoliv zbytečně pingovat, či spamovat kohokoliv na tomto serveru (vztahuje se i do PM).';
		customEmbed.fields[8].inline = true;
		customEmbed.fields[9].name = '8b)';
		customEmbed.fields[9].value = 'Je zakázáno spamovat a zahlcovat chat.';
		customEmbed.fields[9].inline = true;
		customEmbed.fields[10].name = '9)';
		customEmbed.fields[10].value = 'Je zakázáno mít nevhodný nickname, avatar či status.';
		customEmbed.fields[10].inline = true;
		customEmbed.fields[11].name = '10)';
		customEmbed.fields[11].value = 'Je zakázána PM reklama.';
		customEmbed.fields[11].inline = true;
		customEmbed.fields[12].name = '11)';
		customEmbed.fields[12].value = 'Je zakázáno rozesílat jakékoliv pornografické odkazy, lekací obrázky, nevhodné videa, gify apod. krom místností tomu vyhrazeným (pokud tu taková místnost bude).';
		customEmbed.fields[12].inline = true;
		customEmbed.fields[13].name = '12)';
		customEmbed.fields[13].value = 'Rasismus, homofóbie, nacismus, vnucování ideologií a podobné hovna jsou zakázány. (výjimkou jsou memes které mají účel pobavit).';
		customEmbed.fields[13].inline = true;
		customEmbed.fields[14].name = '13)';
		customEmbed.fields[14].value = 'Je přísně zakázano obcházet tresty.';
		customEmbed.fields[14].inline = true;
		customEmbed.fields[15].name = '\u200B';
		customEmbed.fields[15].value = '\u200B';
		customEmbed.fields[15].inline = undefined;
		customEmbed.fields[16].name = 'TOS a Guidelines';
		customEmbed.fields[16].value = '➣ Platí zde pravidla TOS a Guidelines @everyone\n🔗 https://discordapp.com/terms\n🔗 https://discordapp.com/guidelines\n➣ S ověřením souhlasíš s pravidly tohoto discord serveru a s pravidly TOS a Guidelines\n➣ Také souhlasíš že je ti více než 13 let a můžeš legálně používat discord, pokud AT zjistí že ti ještě 13 let nebylo bude ti udělen ban do doby než ti bude 13 let.';
		customEmbed.fields[16].inline = true;
		customEmbed.fields[17].name = '\u200B';
		customEmbed.fields[17].value = '\u200B';
		customEmbed.fields[17].inline = undefined;
		customEmbed.fields[18].name = 'Ověření ✅';
		customEmbed.fields[18].value = 'Ověříš se pomocí zareagování na tuto\nzprávu kliknutím na tlačítko = ✅';
		customEmbed.fields[18].inline = true;

		await message.edit({ embeds: [customEmbed]});
		await ctx.deferUpdate();
		return;
	}
});