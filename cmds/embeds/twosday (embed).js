const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "twosday",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ message }) {
    const customEmbed = new Discord.MessageEmbed()
      .setColor('#7300ff')
      .setTitle('**🎉 Twosday 22.2.2022 22:22 🎉**') 
      .setDescription('The coolest date of our decade!')
      .setImage('https://cdn.24.co.za/files/Cms/General/d/3176/2ba03ea654b9431d9e6161a26a9fab87.jpg')
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Twosday 22.2.2022 22:22', value: 'Today is a magical date that everyone will notice at first. A similar one was repeated this year, namely 2.2.2022 and 20.2.2022. Today\'s date 22.2.2022 is special also because it is a so-called palindrome! So it can be read backwards and will remain the same. But if you think about it Twosday 22.2.2022 22:22 is even cooler than just 22.2.2022. That\'s the coolest date and time of our decade.. right? You can celebrate it but you don\'t have to. If you decide to celebrate it somehow.. then please don\'t get drunk.. ok?', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'Happy Twosday 22.2.2022 22:22', value: 'By that date and time, our server is officially in normal mode again. ||Psáno anglicky protože Twosday by v češtině neznělo tak dobře.||' },
      )
      .setTimestamp()
  .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    message.delete(1)
    message.channel.send({ embeds: [customEmbed] });
  }
}