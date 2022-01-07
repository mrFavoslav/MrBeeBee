const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "howgay",
      description: "",
      /*args: [
        {
          name: "target",
          type: ArgumentType.USER,
          description: "Target.",
          prompt: "U koho chceš zjistit na kolik procent je gay?",
          required: false,
        },
      ],*/
    });
  }

  async run({ client, respond, rng, message, guild }, args) {
     //let target = guild.members.cache.get(args[0].replace(/!|@|<|>/g,"")) || message.author
     let target = message.mentions.users.first() || message.author

        rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`-- GAY METER --`)
        .setAuthor(target/*.user*/.tag, target/*.user*/.displayAvatarURL({ dynamic: true }))
        .addField(`❓ Na kolik procent je ${target/*.user*/.username} Gay?`, `🌈 ${target/*.user*/.username} je na ${rng}% gay`)
        .setColor('#E800FF')
        .setTimestamp()

        respond(howgayembed);
  }
}