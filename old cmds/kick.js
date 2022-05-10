const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json')
const prefix = config.prefix

module.exports = {
    name: 'kick',
    description: "Vyhodí uživatele!",
    aliases: [],
    execute(client, message, args, Discord) {

        const target = message.mentions.users.first();

        if (!message.member.hasPermission(['KICK_MEMBERS' || 'ADMINISTRATOR'])) return message.channel.bulkDelete(1)//message.channel.send("Na toto nemáš permisse!")
        else if (!target) return message.channel.send("Prosím označ někoho!");
        else if (!message.guild.member(target).kickable) return message.channel.send('Tohoto uživatele nelze vyhodit!');
        else if (message.author.id === target.id) return message.channel.send('Nemůžeš vyhodit sám sebe!');
        else if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);
            let reason = args.slice(1).join(" ");
            if (!reason) reason = "Nebyl udán!";
            memberTarget.kick(reason);
            message.channel.bulkDelete(1)
            const kickembed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
                .setTitle(`${target.username} byl vyhozen!`)
                .setDescription(`Důvod: ${reason}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            message.channel.send(kickembed);
            console.log(` -- ${message.author.username} spustil cmd kick!`);
        }
    }
}