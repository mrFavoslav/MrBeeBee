const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "avatar",
      description: "Ukáže Avatar uživatele.",
    });
  }

  async run({ client, respond, message }) {
    let user = message.mentions.users.first() || message.author

    const avatarEmbed = new Discord.MessageEmbed()
      .setColor('#00FFF3')
      .setAuthor(user.tag)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }));
    respond(avatarEmbed);
  }
}