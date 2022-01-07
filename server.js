const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send("BOT je online!");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("UptimeRobot je připraven!");
  });
}

module.exports = keepAlive;