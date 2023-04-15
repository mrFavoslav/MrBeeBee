const { Component, ComponentType } = require('gcommands');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
new Component({
  name: 'verfrules',
  type: [ComponentType.BUTTON],
  run: async (ctx) => {

    const AlrVerifiedEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('❌ Already Verified')
      .setDescription('🇨🇿 Už jsi ověřen. Není třeba se ověřovat znovu.\n🇬🇧 You are already verified. No need to authenticate again.')
      .setTimestamp()

    const verifyEmbed = new EmbedBuilder()
      .setColor('#00FF0C')
      .setTitle('✅ Verified')
      .setDescription('🇨🇿 Byl jsi ověřen! Nyní máš přístup k serveru!\n🇬🇧 You have been verified! Now you have access to the server!')
      .setTimestamp()

    const verifyEmbed2 = new EmbedBuilder()
      .setColor('#00FF0C')
      .setTitle('✅ Verified')
      .setDescription(`🇨🇿 ${ctx.member} byl právě ověřen!\n🇬🇧 ${ctx.member} was verified!`)
      .setTimestamp()

    if (ctx.member.roles.cache.has('816426874967162941')) {
      await ctx.member.send({ embeds: [AlrVerifiedEmbed] });
      await ctx.deferUpdate();
      return;
    } else if (!ctx.member.roles.cache.has('816426874967162941')) {
      ctx.member.roles.add('816426874967162941')
      ctx.member.send({ embeds: [verifyEmbed] })

      if (ctx.member.id !== '816656200993079298') {
        const verifyEmbed2 = new EmbedBuilder()
          .setColor('#00FF0C')
          .setTitle('✅ Verified')
          .setDescription(`🇨🇿 ${ctx.member} byl právě ověřen!\n🇬🇧 ${ctx.member} was verified!`)
          .setTimestamp()

        const channel = ctx.client.channels.cache.get('934124458464141382')
        await channel.send({ embeds: [verifyEmbed2] })
        await ctx.deferUpdate();
        return;
      }
    }
    await ctx.deferUpdate();
    return;
  }
});