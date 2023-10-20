const { Discord, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { Command, CommandType, Argument, ArgumentType, customId } = require('gcommands')
const fs = require('fs')
const path = require('path')

new Command({
  name: 'help',
  description: 'Shows list of commands.',
  type: [CommandType.SLASH],
  run: ctx => {
    let row;
    let pageid;
    const buttonComponents = [];
    const loadedbuttons = [];
    const cmdlist = [];

    const helpEmbed = new EmbedBuilder()
      .setTitle('MrBB Manual')
      .setDescription(`[**Website**](https://www.favoslav.cz/mrbb) x [**Creators Website**](https://www.favoslav.cz)\n[**Support**](https://www.favoslav.cz/contact) x [**DOCS**](https://www.favoslav.cz/mrbb/docs)\nBy using this bot you accept the [**TOS**](https://www.favoslav.cz/mrbb/tos)`)
      .setColor('#ff2414')

    const cmdsDirectory = path.join(__dirname, '..')
    const files = fs.readdirSync(cmdsDirectory)
    files.forEach(file => {
      try {
        const filePath = path.join(cmdsDirectory, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
          return
        } else {
          const info = require(filePath)
          cmdlist.push(info.name)
          const arr = info.legend && info.legend.length > 0 ? info.legend.join('\r\n') : undefined
          console.log('UserOnly: ' + (info.inhibitors?.UserOnly || 'Undefined'))
          console.log('UserID: ' + ctx.user.id)
          helpEmbed.addFields(
            {name: `${info.showName}`, value: `${`**\`${info.description}\`**` ?? ''}${arr ? '\n' + '- More possible options.' : ''}`}
          )

          if (buttonComponents.length < 4) {
            // Limit to 4 buttons
            const button = new ButtonBuilder()
              .setCustomId(customId(`${info.showName}`, ctx.userId))
              .setLabel(`${info.showName}`)
              .setStyle('Success')
            buttonComponents.push(button)
            loadedbuttons.push(info.showName)
            const indexToRemove = cmdlist.indexOf(info.name); // Find the index of the item to remove
            if (indexToRemove !== -1) {
              cmdlist.splice(indexToRemove, 1); // Remove one item at the found index
            }
          }
        }
      } catch (err) {
        console.error(`Error processing file: ${file}`)
        console.error(err)
        return;
      }
    })

    if (buttonComponents.length == 4) {
      const pageid = 1
      const button = new ButtonBuilder()
        .setCustomId(customId('nextpage', `${pageid}`))
        .setLabel(`Next Page >`)
        .setStyle('Secondary')
      buttonComponents.push(button)
    }
    row = new ActionRowBuilder().addComponents(buttonComponents);
    console.log(cmdlist)

    module.exports = cmdlist;
    return ctx.safeReply({embeds: [helpEmbed], ephemeral: true, components: [row]});
  }
})
