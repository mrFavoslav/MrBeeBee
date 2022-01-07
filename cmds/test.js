const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "test",
      description: "Testovací cmd",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({ client, member, message, respond, guild }) {
    const owner = await guild.fetchOwner();
    const banembed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('🖐️ Welcome')
        .setDescription(`Ahoj ${message.author}! Vítej na **${guild.name}**! Je nás zde ${guild.memberCount}! Doufám že si to zde užiješ! Majitelem serveru je ${owner}! Přečti si prosím <#816664688015179782>! Díky.`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/817323618576760853/828679554851143701/NewUser.png')

      //const channel = client.channels.cache.get('828674300969484298');
      //channel.send({ embeds: [banembed] })
      respond(banembed)
}
}