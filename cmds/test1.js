const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "test1",
      description: "Testovací cmd",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ respond, message, channel }) {

const { MessageActionRow, MessageButton } = require("gcommands");

let row = new MessageActionRow().addComponents([
  new MessageButton()
    .setLabel("Yes")
    .setCustomId("yes")
    .setStyle("SUCCESS"),

  new MessageButton()
    .setLabel("No")
    .setCustomId("no")
    .setStyle("DANGER"),

]);

let msg = await channel.send({
  content: 'Are you sure?',
  components: [row],
  ephemeral: true,
});

let filter = (interaction) =>
  interaction.isButton() && interaction.author.id === message.author.id;
let collector = msg.createMessageComponentCollector(filter, {
  max: 1,
  time: 1000 * 10,
});

collector.on("collect", (btn) => {
  btn.reply.send({
    content: `${btn.user.toString()}, you clicked ${btn.customId}!`,
  });
});
/*collector.on("end", (btn) => {
  msg.reply({
    content: `Time ran out!`,
  });
});*/

}
}