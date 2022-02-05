const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "roleadd",
      description: "Přidá všem specifickou roli.",
      userRequiredPermissions: 'MANAGE_ROLES' || 'ADMINISTRATOR',
    });
  }

async run({ member, client, message, guild, respond }) { 
    
    let role = message.mentions.roles.first() 
    if (!role) return respond('Prosím definuj roli!')
    
      message.guild.members.cache.filter((member) => !member.user.bot).forEach(member => {
        setInterval(function() {
        member.roles.add(role);
          }, 1000);
      });
    
    respond(`Všem byla přidána role ${role}.`), console.log(`Všem byla přidána role ${role}.`)
  }
}