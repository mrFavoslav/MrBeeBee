const { Client, Discord, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { Command, Inhibitor: { MemberPermissions, UserOnly }, CommandType, Argument, ArgumentType } = require("gcommands");
const info = {
  name: "purge",
  showName: "Purge",
  description: "Purges messages from chat",
  type: [CommandType.SLASH]
}
new Command({
  name: info.name,
  description: info.description,
  type: info.type,
  arguments: [
    new Argument({
      name: 'count',
      description: 'Count of messages to delete.',
      type: ArgumentType.INTEGER,
      required: true,
    })
  ],
  inhibitors: [
    new MemberPermissions({
      permissions: [PermissionsBitField.Flags.MANAGE_MESSAGES],
      message: 'You can\'t use this command. You need \'MANAGE_MESSAGES\' permissions!',
      ephemeral: true,
    }),
  ],
  run: (ctx) => {
    var eph = true;
    const count = ctx.arguments.getInteger('count')

    const wrn1 = new EmbedBuilder()
      .setTitle("⚠️ Warning")
      .setDescription('Cannot delete more than 100 messages!')
      .setFooter({
        text: ctx.user.tag,
        iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    const wrn2 = new EmbedBuilder()
      .setTitle("⚠️ Warning")
      .setDescription('You must enter a number greater than 0!')
      .setFooter({
        text: ctx.user.tag,
        iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    if (count > 100) return ctx.safeReply({ embeds: [wrn1], ephemeral: eph });
    if (count < 1) return ctx.safeReply({ embeds: [wrn2], ephemeral: eph })/*.then(setTimeout(() => ctx.deleteReply(), 5000))*/;

    const purgeembed = new EmbedBuilder()
      .setColor('#cc3300')
      .setTitle('🗑️ Purge')
      .addFields({
        name: `🔍 Deleted successfully!`,
        value: `✉️ Number of messages: ${count}.`,
      })
      .setFooter({
        text: ctx.user.tag,
        iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp()

    ctx.interaction.channel.bulkDelete(count);
    return ctx.reply({ embeds: [purgeembed], ephemeral: eph })
  },
});
module.exports = info;