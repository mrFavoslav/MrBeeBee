const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "bver",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ message }) {
    const customEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('**Přístup k serveru.**')
  .setDescription('Verifikace')
  .setThumbnail('https://cdn.discordapp.com/icons/779693986603991072/85ba883ba6f1c685a86652a35c76b29f.png?size=4096')
  .addFields(
        //{ name: '\u200B', value: '\u200B' },
    { name: 'Normal mode', value: 'Server je nyní opět v normálním módu. Bot stále zůstává v beta fázi.', inline: true },
    { name: 'Přístup na server', value: 'K tomu aby jste získali přístup k serveru si prosím přečtěte <#816664688015179782> a poté se podle instrukcí v nich obsažených ověřte. ', inline: true },
)
	.setTimestamp()
  .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
  message.delete(1)
 message.channel.send({ embeds: [customEmbed] });
  }
}