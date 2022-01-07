const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ban",
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
        {
          name: "time",
          type: ArgumentType.STRING,
          description: "Na jak dlouho chceš zabanovat uživatele?",
          prompt: "Na jak dlouho?",
          required: true,
        },
      ],
    });
  }

  async run({ client, respond, message, guild }, args) {
    let target = guild.members.cache.get(args[0].replace(/!|@|<|>/g,""))
    let time = args[1]
    let reason = args.slice(2).join(" ")

    if (!target.bannable) return respond('Tohoto uživatele nelze zabanovat!');
    if (target.id === message.author.id) return respond('Nemůžeš zabanovat sám sebe!');
    if (target) {
      /*target.ban({
        reason: reason,
        time: time
      });*/
      const banembed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('🔒 Ban')
        .setAuthor(target.user.tag, target.user.displayAvatarURL({ dynamic: true }))
        .addFields(
          { name: '📇 ID uživatele', value: `${target.id}`, inline: false },
          { name: '❓ Důvod', value: `${reason}`, inline: false },
          { name: '🕒 Doba', value: `${time}d`, inline: false },
        )
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

      const channel = client.channels.cache.get('893927499241754694');
      channel.send({ embeds: [banembed] })

      const respembed = new Discord.MessageEmbed()
        .setColor('#0CFF00')
        .setTitle('✅ Akce provedena!')

        respond(respembed)
    }
  }
}