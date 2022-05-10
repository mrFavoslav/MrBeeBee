const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "roleadd",
      description: "Přidá všem specifickou roli.",
      userRequiredPermissions: 'MANAGE_ROLES' || 'ADMINISTRATOR',
      args: [
        {
          name: "role",
          type: ArgumentType.ROLE,
          description: "Role",
          prompt: "Definuj prosím roli.",
          required: true,
        },
      ],
    });
  }

async run({ message, respond, args }) { 
    
    let role = args.getRole('role')
    
      message.guild.members.cache.filter((member) => !member.user.bot).forEach(member => {
        setInterval(function() {
        member.roles.add(role);
          }, 1000);
      });
    
    respond(`Všem byla přidána role ${role}.`), console.log(`Všem byla přidána role ${role}.`)
  }
}