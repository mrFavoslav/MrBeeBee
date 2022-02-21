const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "inviteembed",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, respond, message }) {
    const customEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('**Invite link na BOAGC**')  
  .setImage('https://cdn.discordapp.com/attachments/817323618576760853/939607977671929906/GeoGlitchedv2.png')
	.addFields(
		{ name: 'Official', value: 'https://discord.gg/fHZ4kPAxxk '},
		{ name: 'Favoslav_', value: 'https://dsc.favoslav.tk/'},
    { name: 'BOAGC', value: 'https://dsc.boagc.tk/'},
	)
	.setTimestamp()
  //.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
  .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
  message.delete(1)
 message.channel.send({ embeds: [customEmbed] });
  }
}