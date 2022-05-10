const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "howgay",
      description: "",
      args: [
        {
          name: "target",
          type: ArgumentType.USER,
          description: "Target",
          prompt: "U koho chceš zjistit na kolik procent je gay?",
          required: false,
        },
      ],
    });
  }

  async run({ respond, rng, message, args }) {

     const target = args.getUser('target') || message.author

        rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`-- GAY METER --`)
        .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
        .addField(`❓ Na kolik procent je ${target.username} Gay?`, `🌈 ${target.username} je na ${rng}% gay`)
        .setColor('#E800FF')
        .setTimestamp()

        respond(howgayembed);
  }
}