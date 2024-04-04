const { Discord, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { Command, CommandType, Argument, ArgumentType, customId } = require('gcommands')
const fs = require('fs')
const path = require('path')
const sortList = require('/home/mrbb_bot/functions/cmd_help/namelater.js')

new Command({
  name: 'help',
  description: 'Shows list of commands.',
  type: [CommandType.SLASH],
  run: ctx => {
    const helpEmbed = new EmbedBuilder()
      .setTitle('MrBB Manual')
      .setDescription(`[**Website**](https://www.favoslav.cz/mrbb) x [**Creators Website**](https://www.favoslav.cz)\n[**Support**](https://www.favoslav.cz/contact) x [**DOCS**](https://www.favoslav.cz/mrbb/docs)\nBy using this bot you accept the [**TOS**](https://www.favoslav.cz/mrbb/tos)`)
      .setColor('#ff2414')
    
    // const cmdsDirectory = path.join(__dirname, '..');
    // const files = fs.readdirSync(cmdsDirectory);
    // const cmdlist = [];

    // function fetchCmdList() {
    //   files.forEach(file => {
    //     try {
    //       const filePath = path.join(cmdsDirectory, file)
    //       const stat = fs.statSync(filePath)
  
    //       if (stat.isDirectory()) {
    //         return;
    //       } else {
    //         const info = require(filePath)

    //         const name = info.name;
    //         const showName = info.showName;
    //         const description = info.description;
    //         const legend = info.legend && info.legend.length > 0 ? info.legend.join('\r\n') : undefined

    //         cmdlist.push({ name:name, showName:showName, description:description, legend:legend });
    //       }
    //     } catch (err) {
    //       console.error(`Error processing file: ${file}`)
    //       console.error(err)
    //       return;
    //     }
    //   })
    // };
    // fetchCmdList();
    
    // // Create an array to store the sorted lists
    // const sortedLists = [];

    // // Define the number of objects in each segment
    // const maxObjectsInFirstSegment = 4;
    // const objectsInMiddleSegments = 3;
    // const objectsInLastSegment = 4;

    // // Start with the first segment
    // let currentIndex = 0;

    // // Process the first segment
    // sortedLists.push(cmdlist.slice(currentIndex, currentIndex + maxObjectsInFirstSegment));
    // currentIndex += maxObjectsInFirstSegment;

    // // Process the middle segments
    // while (currentIndex < cmdlist.length - objectsInLastSegment) {
    //   sortedLists.push(cmdlist.slice(currentIndex, currentIndex + objectsInMiddleSegments));
    //   currentIndex += objectsInMiddleSegments;
    // }

    // // Process the last segment
    // sortedLists.push(cmdlist.slice(currentIndex, currentIndex + objectsInLastSegment));

    const sortedLists = sortList('/home/mrbb_bot/cmds');

    const buttonComponents = [];
    let pageIndex = 0;
    for (const obj of sortedLists[pageIndex]) {
      helpEmbed.addFields(
        {name: obj.showName, value: obj.description}
      );
      const button = new ButtonBuilder()
        .setCustomId(customId(`${obj.showName}`, ctx.userId))
        .setLabel(`${obj.showName}`)
        .setStyle('Success')
      buttonComponents.push(button)
    }
    row = new ActionRowBuilder().addComponents(buttonComponents);

    return ctx.safeReply({embeds: [helpEmbed], ephemeral: true, components: [row]});
  }
})
