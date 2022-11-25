const Discord = require('discord.js');
const prefix = "b";
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "help",
      description: "Výběr kategorie Help",
    });
  }

  async run({ respond, message }) {
    const helpembed = new Discord.MessageEmbed()
      .setColor('#cc3300')
      .setTitle('**Help - Vyber si kategorii.**')
      .addField('Utilities', `Použití: ${prefix}helpu `)
      .addField('Fun', `Použití: ${prefix}helpf `)
      .addField('Moderation', `Použití: ${prefix}helpm `)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    respond(helpembed)
    /*setTimeout(function () {
      respond(`${message.author} Jakou kategorii jsi si vybral?`)
    }, 3000);*/
  }
}