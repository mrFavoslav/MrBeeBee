const { Discord, EmbedBuilder } = require("discord.js");
const { Command, CommandType, Argument, ArgumentType } = require("gcommands");
const info = {
  name: "howgay",
  showName: "HowGay",
  description: "How much are you gay?",
  type: [CommandType.SLASH]
}
new Command({
  name: info.name,
  description: info.description,
  type: info.type,
  arguments: [
    new Argument({
      name: "target",
      description: "Pick a user or press enter for picking yourself.",
      type: ArgumentType.USER,
      required: false,
    }),
  ],
  run: (ctx, rng) => {
    const target = ctx.arguments.getMember("target")?.user || ctx.user;
    rng = Math.floor(Math.random() * 101);

    const howgayembed = new EmbedBuilder()
      .setColor("#E800FF")
      .setTitle(`🏳️‍🌈 GAY METER 🏳️‍🌈`)
      .addFields({
        name: `❓ On What percentage are you GAY?`,
        value: `**🌈 ${target.username} is on ${rng}% GAY!**`,
      })
      .setImage('https://images.foxtv.com/static.ktvu.com/www.ktvu.com/content/uploads/2021/06/932/524/traditional-rainbow-flag.jpeg?size=512')
      .setThumbnail(target.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    return ctx.reply({ embeds: [howgayembed] });
  },
});
module.exports = info;