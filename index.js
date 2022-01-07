process.env.TZ = "Europe/Amsterdam"; console.log(new Date().toString());

const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { GCommandsClient } = require("gcommands");
const { join } = require("path");
const client = new GCommandsClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_INVITES],
  loader: {
    cmdDir: join(__dirname + "/cmds"),
    eventDir: join(__dirname, "/events"),
  },
  language: "czech",
  commands: {
    unkownCommandMessage: false,
    caseSensitiveCommands: false,
    caseSensitivePrefixes: true,
    slash: "message", //slash = slash only, message = only normal, both = slash and normal
    context: "false", // https://gcommands.js.org/docs/#/docs/main/dev/typedef/GCommandsOptionsCommandsContext
    prefix: "b", // for normal commands
  },
  defaultCooldown: "3s",
});

client
  .on("log", console.log)
  .on("debug", console.log)

client.login(process.env['TOKEN'])