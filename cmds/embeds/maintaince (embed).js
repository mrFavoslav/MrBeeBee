const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "maintaincemode",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, respond, message }) {
    const customEmbed = new Discord.MessageEmbed()
	.setColor('#FF0000')
	.setTitle('**Maintaince mode**')
  .setDescription('Server bude nyní nějakou dobu v maintaince módu. Prosím strpení.')
  .setImage('https://cdn.discordapp.com/attachments/817323618576760853/930177123421913117/gear-icon-2.png')
	.setTimestamp()
  //.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
  .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
  message.delete(1)
  message.channel.send({ embeds: [customEmbed] });
  }
}