const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ahoj",
      description: "Vytvoří custom embed zprávu.",
      userRequiredPermissions: 'ADMINISTRATOR',
    });
  }

  async run({client, channel, message }) {
    const usr = client.users.cache.get('919216556116955146');
    console.log(usr)

    const joinembed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('🖐️ Welcome')
      .setDescription(`🇨🇿 Ahoj <@919216556116955146>! Vítej na **BOAGC 🎮**! Je nás zde 70! Doufám že si to zde užiješ! Majitelem serveru je <@553946762289610785>! Přečti si prosím <#816664688015179782>! Díky.\n\n🇬🇧 Hi <@919216556116955146>! Welcome to **BOAGC 🎮**! Now there are 70 of us here! I hope you enjoy it here! The server is owned by <@553946762289610785>! Please read <#816664688015179782>! Thanks.`)
      .setAuthor(usr.tag, usr.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setImage('https://cdn.discordapp.com/attachments/945363908078747688/982955966314201108/New-Member.png')
      client.channels.cache.get('828674300969484298').messages.fetch('1041402179862409266').then(msg => msg.edit({ embeds: [joinembed]}))
      //message.channel.send({ embeds: [joinembed] });
  }
}