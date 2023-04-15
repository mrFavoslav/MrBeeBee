const { Client, Discord, EmbedBuilder } = require("discord.js");
const { Command, CommandType, Argument, ArgumentType } = require("gcommands");
new Command({
  name: "ping",
  description: "Shows bots ping.",
  type: [CommandType.SLASH],
  run: (ctx, interaction) => {
    var eph = true;
    const calculating = new EmbedBuilder()
      .setTitle("⏳ Ping")
      .addFields(
        { name: "🤖 Bots Ping", value: `Calculating...`, inline: true, },
        { name: "🌐 WebSocket Ping", value: `Calculating...`, inline: true, })
      .setTimestamp();
    ctx.safeReply({ embeds: [calculating], ephemeral: eph });

    let ping = Date.now() - ctx.interaction.createdTimestamp
    const pingembed = new EmbedBuilder()
      .setTitle("⏳ Ping")
      .addFields(
        { name: "🤖 Bots Ping", value: `${ping}ms`, inline: true, },
        { name: "🌐 WebSocket Ping", value: `${ctx.client.ws.ping}ms`, inline: true, })
      .setTimestamp();

    return setTimeout(function () {
      return ctx.editReply({ embeds: [pingembed], ephemeral: eph });
    }, 1000);
  },
});
