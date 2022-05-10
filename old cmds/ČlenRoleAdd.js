const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "členroleadd",
      description: "Přidá všem specifickou roli.",
    });
  }

  async run({ member, client, message, guild, respond }) {
    console.log('Všem byla přidána role Člen.')
    const Role = message.guild.roles.cache.find(role => role.id === '816426874967162941');
    Role.members.forEach((member, i) => { // Looping through the members of Role.
      setTimeout(() => {
        member.roles.add(Role); // Removing the Role.
      }, i * 1000);
    });
    respond('Sucess!')
  }
}