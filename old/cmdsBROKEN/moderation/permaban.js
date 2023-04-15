const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "pban",
      description: "Zabanuje uživatele.",
      userRequiredPermissions: 'BAN_MEMBERS' || 'ADMINISTRATOR',
      args: [
        {
          name: "target",
          type: ArgumentType.USER,
          description: "Ten kdo bude zabanován.",
          prompt: "Koho chceš zabanovat?",
          required: true,
        },
        {
          name: "reason",
          type: ArgumentType.STRING,
          description: "Důvod.",
          prompt: "Důvod?",
          required: true,
        },
      ],
    });
  }

  async run({ client, respond, message, args }) {

    const target = args.getMember('target')
    const reason = args.getString('reason')

    if (!target.bannable) return respond('Tohoto uživatele nelze zabanovat!');
    if (target.user.id === message.author.id) return respond('Nemůžeš zabanovat sám sebe!');

    const banembed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setAuthor(target.user.tag, target.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '**🔒 Permaban**', value: '\u200B' },
        { name: '📇 ID uživatele', value: `${target.user.id}`, inline: false },
        { name: '❓ Důvod', value: `${reason}`, inline: false },
        { name: '🕒 Doba', value: `Navždy`, inline: false },
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    if (target) {
      const respembed = new Discord.MessageEmbed()
        .setColor('#0CFF00')
        .setTitle('✅ Akce provedena!')

      respond(respembed)
      const channel = client.channels.cache.get('893927499241754694');

      const banembedDM = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(target.user.tag, target.user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: '**🔒 Byl jsi permanentně zabanován!**', value: '\u200B' },
          { name: '❓ Důvod', value: `${reason}`, inline: false },
          { name: '🕒 Doba', value: `Navždy`, inline: false },
        )
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

      target.send({ embeds: [banembedDM] })
      channel.send({ embeds: [banembed] })

      setTimeout(function () {
        target.ban({ reason: reason })
      }, 2000);
    }
  }
}