process.env.TZ = "Europe/Amsterdam"; console.log(new Date().toString());

const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { GCommandsClient } = require("gcommands");
const { join } = require("path");
const client = new GCommandsClient({
  intents: new Discord.Intents(32767),
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  loader: {
    cmdDir: join(__dirname + "/cmds"),
    eventDir: join(__dirname, "/events"),
  },
  language: "english",
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