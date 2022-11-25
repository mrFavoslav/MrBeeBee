const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "avatar",
      description: "Ukáže Avatar uživatele.",
      args: [
        {
          name: "user",
          type: ArgumentType.USER,
          description: "Target",
          prompt: "Čí avatar chceš dostat?",
          required: false,
        },
      ],
    });
  }

  async run({ respond, message, args }) {
    const user = args.getUser('user') || message.author

    const avatarEmbed = new Discord.MessageEmbed()
      .setColor('#00FFF3')
      .setAuthor(user.tag)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }));
    respond(avatarEmbed);
  }
} 