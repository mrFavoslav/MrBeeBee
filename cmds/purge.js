const Discord = require('discord.js');
const { Command, CommandType, Argument, ArgumentType } = require("gcommands");
module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "purge",
      description: "Vymaže chat.",
      userRequiredPermissions: 'MANAGE_MESSAGES' || 'ADMINISTRATOR',
      args: [
        {
          name: "count",
          type: ArgumentType.INTEGER,
          description: "Počet zpráv ke smazání.",
          prompt: "Kolik zpráv chceš smazat?",
          required: true,
        },
      ],
    });
  }

  async run({ message, args }) {
    const count = args.getInteger('count')
    
    if (count > 99) return message.channel.send("**Nelze smazat víc než 99 zpráv!**").then(msg => {setTimeout(() => msg.delete(), 5000)});
    if (count < 1) return message.channel.send("**Musís uvést číslo větší než 0!**").then(msg => {setTimeout(() => msg.delete(), 5000)});

      const purgeembed = new Discord.MessageEmbed()
        .setColor('#cc3300')
        .setTitle('🗑️ Purge')
        .addField(`🔍 Úspešně smazáno!`, `✉️ Počet zpráv: ${count}.`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

      message.channel.bulkDelete(count + 1);
      message.channel.send({ embeds: [purgeembed] })
        .then(msg => {
          setTimeout(() => msg.delete(), 5000)
        })
      //console.log(args) 
  }
}