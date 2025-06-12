const { Client, Discord, EmbedBuilder } = require("discord.js");
const { Command, CommandType, Argument, ArgumentType } = require("gcommands");
const info = {
  name: "ping",
  showName: "Ping",
  description: "Shows bots ping",
  type: [CommandType.SLASH]
}
new Command({
  name: info.name,
  description: info.description,
  type: info.type,
  run: (ctx, interaction) => {
    var eph = 64;
    const calculating = new EmbedBuilder()
      .setTitle("⏳ Ping1")
      .addFields(
        { name: "🤖 Bots Ping", value: `Calculating...`, inline: true, },
        { name: "🌐 WebSocket Ping", value: `Calculating...`, inline: true, })
      .setTimestamp();
    ctx.safeReply({ embeds: [calculating], flags: eph });

    let ping = Date.now() - ctx.interaction.createdTimestamp
    const pingembed = new EmbedBuilder()
      .setTitle("⏳ Ping")
      .addFields(
        { name: "🤖 Bots Ping", value: `${ping}ms`, inline: true, },
        { name: "🌐 WebSocket Ping", value: `${ctx.client.ws.ping}ms`, inline: true, })
      .setTimestamp();

    return setTimeout(function () {
      return ctx.editReply({ embeds: [pingembed], flags: eph });
    }, 1000);
  },
});
module.exports = info;