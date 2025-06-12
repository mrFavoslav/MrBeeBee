const { Discord, EmbedBuilder } = require("discord.js");
const { Command, CommandType, Argument, ArgumentType } = require("gcommands");
const info = {
  name: "avatar",
  showName: "Avatar",
  description: "Shows users avatar",
  type: [CommandType.SLASH]
}
new Command({
  name: info.name,
  description: info.description,
  type: info.type,
  arguments: [
    new Argument({
      name: 'user',
      description: 'Pick a user or press enter for picking yourself.',
      type: ArgumentType.USER,
      required: false,
    })
  ],
  run: (ctx) => {
    const usr = ctx.arguments.getMember('user')?.user || ctx.user;

    const avatarEmbed = new EmbedBuilder()
      .setColor("#00FFF3")
      .setAuthor({
        name: usr.tag,
        iconURL: usr.displayAvatarURL({ dynamic: true }),
      })
      .setImage(usr.displayAvatarURL({ dynamic: true, size: 4096 }));
    return ctx.safeReply({ embeds: [avatarEmbed], flags: 64 });
  },
});
module.exports = info;