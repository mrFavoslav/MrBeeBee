const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json')
const prefix = config.prefix

module.exports = {
    name: 'warn',
    description: "Varuje uživatele!",
    aliases: [],
    execute(client, message, args, Discord) {

        const target = message.mentions.users.first();

        if (!message.member.hasPermission(['KICK_MEMBERS' || 'ADMINISTRATOR' || 'BAN_MEMBERS'])) return message.channel.bulkDelete(1)//message.channel.send("Na toto nemáš permisse!")
        else if (!target) return message.channel.send("Prosím označ někoho!");
        else if (message.author.id === target.id) return message.channel.send('Nemůžeš varovat sám sebe!');
        else if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);
            let reason = args.slice(1).join(" ");
            if (!reason) reason = "Nebyl udán!";
            message.channel.bulkDelete(1)
            const warnembed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
                .setTitle(`${target.username} byl varován!`)
                .setDescription(`Důvod: ${reason}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            message.channel.send(warnembed);
            console.log(` -- ${message.author.username} spustil cmd warn!`);
        }
    }
}