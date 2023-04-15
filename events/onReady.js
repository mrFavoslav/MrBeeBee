const { Discord, ActivityType, Client, Attachment, Message, EmbedBuilder } = require("discord.js");
const { Listener } = require("gcommands");
const util = require("minecraft-server-util");
const botvers = require("../package.json");
new Listener({
  event: "ready",
  name: "readyBOAGC",
  run: (client) => {
    console.log(`Logged in as ${client.user.tag}. Initialized with ${client.guilds.cache.size} guilds.`);
    
    client.user.setPresence({
      activities: [
        {
          name: `${botvers.state} ${botvers.version}${botvers.stage}`,
          type: ActivityType.Streaming,
          url: "https://www.twitch.tv/Favoslav_",
        },
      ],
      status: "online",
    });
  },
});
