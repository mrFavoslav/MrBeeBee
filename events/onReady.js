const { Discord, ActivityType, Client, Attachment, Message, EmbedBuilder } = require("discord.js");
const { Listener } = require("gcommands");
const util = require("minecraft-server-util");
const botvers = require("../package.json");
const fetch = require("node-fetch")
new Listener({
  event: "ready",
  name: "readyBOAGC",
  run: async (client) => {
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

    async function uptimerobot(){
      console.log("[Better Uptime] Sending Heartbeat.");
      let response;
      try {
        response = await fetch('https://betteruptime.com/api/v1/heartbeat/CQjU7TC59hYWtEM5XAuuDagS', {method: 'POST'});
        if (response.ok == true) {
          return;
        } else if (response.ok == false) {
          throw new Error("[Better Uptime] Heartbeat denied, status " + `${response.status} ${response.statusText}.`);
        } else {
          throw new Error("[Better Uptime] Unknown Error, status " + `${response.status} ${response.statusText}.`);
        }
      } catch (error) {
        console.error(error)
      } finally {
        console.log("[Better Uptime] Heartbeat acknowledged, status " + `${response.status} ${response.statusText}.`);
        await new Promise(resolve => setTimeout(resolve, 180000));
        await uptimerobot();
      }
    }
    uptimerobot();
  },
});
