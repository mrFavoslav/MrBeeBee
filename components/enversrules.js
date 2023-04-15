const { Component, ComponentType } = require('gcommands');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
new Component({
	name: 'enversrules',
	type: [ComponentType.BUTTON],
	run: async (ctx) => {

		const channel = await ctx.client.channels.fetch('816664688015179782');
		const message = await channel.messages.fetch('1096869424843215060');

		const customEmbed = message.embeds[0];

		customEmbed.data.title = '**📜 RULES 📜**';
		customEmbed.data.description = 'Rules for server members.';
		customEmbed.data.image.url = "https://cdn.discordapp.com/attachments/945363908078747688/1031149429098561606/rules.png";
		customEmbed.fields[0].name = '1)';
		customEmbed.fields[0].value = 'Act like a normal person.';
		customEmbed.fields[0].inline = true;
		customEmbed.fields[1].name = '2)';
		customEmbed.fields[1].value = 'No begging for roles.';
		customEmbed.fields[1].inline = true;
		customEmbed.fields[2].name = '3)';
		customEmbed.fields[2].value = 'It is forbidden to annoy the A-Team with nonsense.';
		customEmbed.fields[2].inline = true;
		customEmbed.fields[3].name = '4)';
		customEmbed.fields[3].value = 'If you find any flaws or mistakes, for example in the rules, do not abuse them.';
		customEmbed.fields[3].inline = true;
		customEmbed.fields[4].name = '5)';
		customEmbed.fields[4].value = 'If the AdminTeam asks you to do something (leave the room, etc.) you are obliged to do it immediately!';
		customEmbed.fields[4].inline = true;
		customEmbed.fields[5].name = '6a)';
		customEmbed.fields[5].value = 'It is forbidden to play music except in the room reserved for it. (Exception only if it doesn\'t bother others.)';
		customEmbed.fields[5].inline = true;
		customEmbed.fields[6].name = '6b)';
		customEmbed.fields[6].value = 'It is forbidden to play sounds or anything that could disturb other users in the vc.';
		customEmbed.fields[6].inline = true;
		customEmbed.fields[7].name = '7)';
		customEmbed.fields[7].value = 'It is forbidden to insult members of the server, but some profanity is allowed.';
		customEmbed.fields[7].inline = true;
		customEmbed.fields[8].name = '8a)';
		customEmbed.fields[8].value = 'It is forbidden to unnecessarily ping or spam anyone on this server (this also applies to PM).';
		customEmbed.fields[8].inline = true;
		customEmbed.fields[9].name = '8b)';
		customEmbed.fields[9].value = 'It is forbidden to spam and flood the chat.';
		customEmbed.fields[9].inline = true;
		customEmbed.fields[10].name = '9)';
		customEmbed.fields[10].value = 'It is forbidden to have an inappropriate nickname, avatar or status.';
		customEmbed.fields[10].inline = true;
		customEmbed.fields[11].name = '10)';
		customEmbed.fields[11].value = 'PM advertising is prohibited.';
		customEmbed.fields[11].inline = true;
		customEmbed.fields[12].name = '11)';
		customEmbed.fields[12].value = 'It is forbidden to send any pornographic links, scary pictures, inappropriate videos, gifs, etc., except in the rooms reserved for that (if there is such a room).';
		customEmbed.fields[12].inline = true;
		customEmbed.fields[13].name = '12)';
		customEmbed.fields[13].value = 'Racism, homophobia, Nazism, the imposition of ideologies and similar shit are prohibited. (the exception is memes that have the purpose of entertaining).';
		customEmbed.fields[13].inline = true;
		customEmbed.fields[14].name = '13)';
		customEmbed.fields[14].value = 'Circumventing penalties is strictly prohibited.';
		customEmbed.fields[14].inline = true;
		customEmbed.fields[15].name = '\u200B';
		customEmbed.fields[15].value = '\u200B';
		customEmbed.fields[15].inline = undefined;
		customEmbed.fields[16].name = 'TOS a Guidelines';
		customEmbed.fields[16].value = '➣ TOS and Guidelines apply here @everyone\n🔗 https://discordapp.com/terms\n🔗 https://discordapp.com/guidelines\n➣ By verifying, you agree to the rules of this discord server and the TOS and Guidelines\n➣ You also agree that you are over 13 years old and can legally use discord, if AT finds that you are not yet 13 years old, you will be banned until you are 13 years old.';
		customEmbed.fields[16].inline = true;
		customEmbed.fields[17].name = '\u200B';
		customEmbed.fields[17].value = '\u200B';
		customEmbed.fields[17].inline = undefined;
		customEmbed.fields[18].name = 'Verification ✅';
		customEmbed.fields[18].value = 'You can verify yourself by responding to this message\nby clicking the = ✅ button';
		customEmbed.fields[18].inline = true;

		await message.edit({ embeds: [customEmbed] });
		await ctx.deferUpdate();
		return;
	}
});