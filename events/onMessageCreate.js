const Discord = require('discord.js');
const { Event } = require("gcommands")
module.exports = class Ping extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            once: false,
            ws: false
        })
    }

    async run(client, message) {
      if (message.partial) {
        message.fetch()
          .then(fullMessage => {
            console.log(fullMessage.content);
          })
          .catch(error => {
            console.log('Something went wrong when fetching the message: ', error);
          });
      } else {
        console.log(`${message.author.tag} -> ${message.content}`)
      }
    }
};