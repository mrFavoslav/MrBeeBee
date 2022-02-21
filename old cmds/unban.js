const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "",
      description: "Odbanuje uživatele.",
      userRequiredPermissions: 'BAN_MEMBERS' || 'ADMINISTRATOR',
      args: [
        {
          name: "target",
          type: ArgumentType.USER,
          description: "Ten kdo bude odbanován.",
          prompt: "Koho chceš odbanovat?",
          required: true,
        },
      ],
    });
  }

  async run({ client, respond, message, guild }, args) {
    let target = guild.members.cache.get(args[0].replace(/!|@|<|>/g, ""))

    if (target.id === message.author.id) return respond('Zadej platného uživatele.');
    const unbanembed = new Discord.MessageEmbed()
      .setColor('#0CFF00')
      .setTitle('🔓 UnBanned')
      .setAuthor(target.user.tag, target.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    const channel = client.channels.cache.get('893927499241754694');
    channel.send({ embeds: [unbanembed] })

    const respembed = new Discord.MessageEmbed()
      .setColor('#0CFF00')
      .setTitle('✅ Akce provedena!')

    respond(respembed)

  }
}