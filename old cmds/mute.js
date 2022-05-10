const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json')
const prefix = config.prefix

const ms = require('../packages/ms');
module.exports = {
    name: 'mute',
    description: "Umlčí uživatele",
    aliases: [],
    execute(client, message, args, Discord) {
        const target = message.mentions.users.first();
        if (!message.member.hasPermission(['KICK_MEMBERS' || 'BAN_MEMBERS' || 'ADMINISTRATOR'])) return message.channel.bulkDelete(1)//message.channel.send("Na toto nemáš permisse!")
        else if (!target) return message.channel.send("Prosím označ někoho!");
        else if (!message.guild.member(target).kickable) return message.channel.send('Tohoto uživatele nelze umlčet!');
        else if (message.author.id === target.id) return message.channel.send('Nemůžeš umlčet sám sebe!');

        else if (target) {
 
            let mainRole = message.guild.roles.cache.find(role => role.id === '816426874967162941');
            let muteRole = message.guild.roles.cache.find(role => role.id === '840952109469007923');
 
            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
            return message.channel.send('Uveď dobu!');
            }

            if (args[1]) {
            message.channel.bulkDelete(1)
            const muteembed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
                .setTitle(`${target.username} byl umlčen!`)
                .setDescription(`Doba: ${ms(ms(args[1]))}`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                message.channel.send(muteembed);
                console.log(` -- ${message.author.username} spustil cmd mute!`);
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            }
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));
        }else{
            message.channel.send('Tohoto uživatele nelze najít!');
        }
    }
}