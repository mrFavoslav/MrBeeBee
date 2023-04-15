const { Discord, EmbedBuilder } = require("discord.js");
const { Command, CommandType, Argument, ArgumentType } = require("gcommands");
new Command({
  name: "avatar",
  description: "Shows the user's Avatar.",
  type: [CommandType.SLASH],
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
    return ctx.safeReply({ embeds: [avatarEmbed], ephemeral: true });
  },
});
