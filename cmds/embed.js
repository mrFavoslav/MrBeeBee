const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "news",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, respond, message }) {
    const customEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('**Novinky ze serveru.**')
  .setDescription('Všechny nové featury a věci od posledního oznámení.')
  .setThumbnail('https://cdn.discordapp.com/icons/915618656275275846/552d8b53362460c42e99078f3ee4eee5.png?size=4096')
	//.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
  //.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
	.addFields(
    { name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.setTimestamp()
  //.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
  .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
  message.delete(1)
 respond(customEmbed)
  }
}