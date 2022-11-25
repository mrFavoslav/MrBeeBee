const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "role",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, message }) {
    const customEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('**📜 PRAVIDLA 📜**')
      .setDescription('Pravidla pro členy serveru.')
      .setImage('https://cdn.discordapp.com/attachments/817323618576760853/930188454539706408/image-removebg-preview.png')
      //.addFields()
      .setTimestamp()
      //.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    message.delete(1)

    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Nothing selected')
          .addOptions([
            {
              label: 'Select me',
              description: 'This is a description',
              value: 'first',
            },
            {
              label: 'You can select me too',
              description: 'This is also a description',
              value: 'second',
            },
          ]),
      );

    message.channel.send({ embeds: [customEmbed], components: [row] })
  }
}