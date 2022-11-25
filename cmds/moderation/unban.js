const Discord = require('discord.js');
const { ArgumentType, Command } = require("gcommands");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "unban",
      description: "Odbanuje uživatele.",
      userRequiredPermissions: 'BAN_MEMBERS' || 'ADMINISTRATOR',
      args: [
        {
          name: "target",
          type: ArgumentType.STRING,
          description: "Ten kdo bude odbanován.",
          prompt: "Koho chceš odbanovat?",
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
    const targetID = args.getString('target')
    const reason = args.getString('reason')

    const targetFetch = await client.users.fetch(targetID, { cache: true });
    const targetTag = `${targetFetch.username}#${targetFetch.discriminator}`;

    //console.log(`1-${targetID},2-${targetFetch},3-${targetTag}`)

    const respembed = new Discord.MessageEmbed()
      .setColor('#0CFF00')
      .setTitle('✅ Akce provedena!')

    try {
      const banList = await message.guild.bans.fetch();
      const target2 = banList.get(targetID)

      if (target2) {
        await message.guild.members.unban(targetID)
        respond(respembed);
      } else {
        return respond('Tohoto uživatele nelze odbanovat!');
      }
    } catch (err) {
      console.log(err);
    }

    const unbanembed = new Discord.MessageEmbed()
      .setColor('#0CFF00')
      .setAuthor(targetFetch.tag, targetFetch.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '**🔓 UnBanned**', value: '\u200B' },
        { name: '📇 ID uživatele', value: `${targetID}`, inline: false },
        { name: '❓ Důvod', value: `${reason}`, inline: false },
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    const channel = client.channels.cache.get('893927499241754694');
    channel.send({ embeds: [unbanembed] })

  }
}