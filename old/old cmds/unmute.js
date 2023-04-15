const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config.json');
const prefix = config.prefix

const ms = require('ms');

module.exports = {
    name: 'unmute',
    description: "Zruší umlčení uživatele",
    aliases: [],
    execute(client, message, args, Discord){
        const target = message.mentions.users.first();
        if (!message.member.hasPermission(['KICK_MEMBERS' || 'BAN_MEMBERS' || 'ADMINISTRATOR'])) return message.channel.bulkDelete(1)//message.channel.send("Na toto nemáš permisse!")
        else if (!target) return message.channel.send("Prosím označ někoho!");
        else if(target){
            let mainRole = message.guild.roles.cache.find(role => role.id === '816426874967162941');
            let muteRole = message.guild.roles.cache.find(role => role.id === '840952109469007923');
 
            let memberTarget= message.guild.members.cache.get(target.id);
 
            message.channel.bulkDelete(1)
            const muteembed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true }))
                .setTitle(`${target.username} byl unmutnut!`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                message.channel.send(muteembed);
                console.log(` -- ${message.author.username} spustil cmd unmute!`);
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);

        }else{
             message.channel.send('Tohoto uživatele nelze najít!');
        }
    }
}