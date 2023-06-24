const { Discord, EmbedBuilder, CommandInteractionOptionResolver } = require("discord.js");
const { Command, Inhibitor: { MemberPermissions, UserOnly }, CommandType, Argument, ArgumentType } = require("gcommands");
new Command({
  name: "xmas",
  description: "Sends XMAS embed message.",
  type: [CommandType.SLASH],
  inhibitors: [
    new UserOnly({
      ids: ['553946762289610785'],
      message: 'You can\'t use this command!',
      ephemeral: true,
    }),
  ],
  run: async (ctx) =>{
    const xmasE = new EmbedBuilder()
      .setColor('#088B3A')
      .setTitle('🎄✨ Veselé Vánoce ✨🎄')
      .setDescription('Celý Team BOAGC vám přeje Šťastné a Veselé\nprožití Vánočních svátků!')
      .setThumbnail('https://static.vecteezy.com/system/resources/previews/011/016/451/original/christmas-decoration-with-balls-and-bell-free-png.png')
      /*.addFields({
        name: `🔍 Deleted successfully!`,
        value: `✉️ Number of messages: `,
      })
      /*.setFooter({
        text: ctx.user.tag,
        iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
      })*/
      .setTimestamp()


    await ctx.channel.send({ content: '@everyone', embeds: [xmasE] });
    await ctx.deferReply({ephemeral: true});
    await ctx.editReply({ content: 'Message sended!'});
  },
});