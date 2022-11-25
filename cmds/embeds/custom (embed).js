const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ieufksdjhfbdkufhspifgwizfweifwefweufgo3216465165465",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
      args: [
        {
          name: "color",
          type: ArgumentType.STRING,
          description: "Barva",
          prompt: "Vyber prosím barvu. Pouze hex!",
          required: false,
        },
        {
          name: "title",
          type: ArgumentType.STRING,
          description: "Title",
          prompt: "Vyber prosím title tvého embedu.",
          required: false,
        },
        {
          name: "description",
          type: ArgumentType.STRING,
          description: "Description",
          prompt: "Vyber prosím description tvého embedu.",
          required: false,
        },
      ],
    });
  }

  async run({ message, args }) {
    const color = args.getString('color')
    const title = args.getString('title')
    const description = args.getString('description')
    
    const customEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(description)
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    message.delete(1)
    message.channel.send({ embeds: [customEmbed] });
  }
}