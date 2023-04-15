process.env.TZ = "Europe/Amsterdam";
console.log(new Date().toString());

const { GClient, Plugins, Command, Component } = require("gcommands");
const { GatewayIntentBits } = require("discord.js");
const { join } = require("path");

Plugins.search(__dirname);
Command.setDefaults({
  cooldown: "3s",
});

Component.setDefaults({
	onError: (ctx, error) => {
		return ctx.reply('Oops! Something went wrong')
	} 
});

require("dotenv").config({ path: '/home/mrbb_bot/.env' });
const client = new GClient({
  dirs: [
    join(__dirname, "cmds"),
    join(__dirname, "components"),
    join(__dirname, "events"),
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  messageSupport: true,
  messagePrefix: "bp",
  devGuildId: process.env.DEV_SERVER,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
  ],
});

client.on("log", console.log).on("debug", console.log);

var input = "P"; //R=Release/P=PreRelease
if (input === "R") {
  var input = "TOKENR";
} else if (input === "P") {
  var input = "TOKENP";
} else return console.log("Can't read TOKEN");
console.log(input, "was chosen.");
client.login(process.env[input]);