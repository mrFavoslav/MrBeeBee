const { Discord, ActivityType, Client, Attachment, Message, EmbedBuilder } = require("discord.js");
const { Listener } = require("gcommands");
new Listener({
  event: "guildMemberAdd",
  name: "guildMemberAddBOAGC",
  run: (client) => {
    let getOwners = async () => {
      let owner = await client.guild.fetchOwner().catch(err => err);
      return owner;
    }
    getOwners().then(owner => {
      if (owner !== undefined) {
        if (client.user.bot) return;
        if (client.user.id === "8166562009930792977") {
          console.log("--GargUS joined.");
        } else {
          const joinembed = new EmbedBuilder()
            .setColor("#FF0000")
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }), })
            .setTitle("🖐️ Welcome")
            .setDescription(`🇨🇿 Ahoj ${client.user}! Vítej na **${client.guild.name}**! Je nás zde ${client.guild.memberCount}! Doufám že si to zde užiješ! Majitelem serveru je ${owner.user}! Přečti si prosím <#816664688015179782>! Díky.\n\n🇬🇧 Hi ${client.user}! Welcome to **${client.guild.name}**! Now there are ${client.guild.memberCount} of us here! I hope you enjoy it here! The server is owned by ${owner.user}! Please read <#816664688015179782>! Thanks.`)
            .setTimestamp()
            .setImage("https://cdn.discordapp.com/attachments/945363908078747688/982955966314201108/New-Member.png");
          if (client.guild.id === "779693986603991072") {
            const auditchannel = client.guild.channels.cache.get("828674300969484298");
            const channel2 = client.guild.channels.cache.get("1042100469918609479");
            auditchannel.send({ embeds: [joinembed] });
          } else {
            return;
          }
        }
      }
    })
  },
});
