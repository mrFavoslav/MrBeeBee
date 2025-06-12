const { Discord, ActivityType, Client, Attachment, Message, EmbedBuilder } = require("discord.js");
const { Listener } = require("gcommands");
const util = require("minecraft-server-util");
const botvers = require("../package.json");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config({ path: '/home/mrbb_bot/.env' });

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

        async function uptimerobot() {
            console.log("[Better Uptime] Sending Heartbeat.");
            let response;
            try {
                response = await fetch(process.env.RUPTIME, {method: 'POST'});
                if (response.ok) {
                    console.log("[Better Uptime] Heartbeat acknowledged, status " + `${response.status} ${response.statusText}.`);
                } else {
                    throw new Error("[Better Uptime] Heartbeat denied, status " + `${response.status} ${response.statusText}.`);
                }
            } catch (error) {
                console.error("[Better Uptime] Error:", error.message);
            }
            
            await new Promise(resolve => setTimeout(resolve, 180000));
            await uptimerobot();
        }

        uptimerobot().catch(error => {
            console.error("[Better Uptime] Fatal error in heartbeat loop:", error);
        });
    },
});