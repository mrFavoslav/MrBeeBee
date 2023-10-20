const { Component, ComponentType, customId } = require('gcommands');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
new Component({
  name: 'nextpage',
  type: [ComponentType.BUTTON],
  run: async (ctx) => {
    const buttonComponents = [];
    let row;
    let textBetweenHyphens;
    var pattern = /-(.*?)-/
    var match = pattern.exec(ctx.customId)
    console.log(ctx.customId)

    if (match) {
      const textBetweenHyphens = match[1]
      console.log("[ButtonBuilder] button.custom_id ->", textBetweenHyphens)
    } else {
      console.error('[ButtonBuilder] button.custom_id -> no match found')
      return;
    }

    console.log(ctx.interaction.message.embeds[0]);
    const cmdlist = require("/home/mrbb_bot/cmds/help/help-main.js");
    console.log("list", cmdlist)

    cmdlist.forEach(cmd => {
      const button = new ButtonBuilder()
        .setCustomId(customId(`tst`, ctx.userId))
        .setLabel(`tst`)
        .setStyle('Success')
      buttonComponents.push(button)
    })
    const receivedEmbed = ctx.interaction.message.embeds[0];
    const helpEmbed = EmbedBuilder.from(receivedEmbed)
    row = new ActionRowBuilder().addComponents(buttonComponents);
    
    console.log(ctx)
    return ctx.followUp({embeds: [helpEmbed], ephemeral: true, components: [row]});
  }
});