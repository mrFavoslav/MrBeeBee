const Discord = require('discord.js');
const prefix = "b";
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "helpf",
      description: "Help Kat. - Fun",
    });
  }

  async run({ respond, message, client }) {
    const helpembed = new Discord.MessageEmbed()
      .setColor('#cc3300')
      .setTitle('**Help kat. - Fun.**')
      .addField('How Gay', `Použití: ${prefix}howgay <@uživatel>`)
      .addField('Avatar', `Použití: ${prefix}avatar <@uživatel>/<@msg.author>`)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    respond(helpembed)
  }
}