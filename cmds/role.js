const { Client, Discord, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { Command, Inhibitor: { MemberPermissions, UserOnly }, CommandType, Argument, ArgumentType } = require('gcommands');
const ms = require('ms');

new Command({
  name: 'role',
  description: 'Add/remove role',
  type: [CommandType.SLASH],
  arguments: [
    new Argument({
      name: 'mass',
      description: 'Role for everyone',
      type: ArgumentType.SUB_COMMAND_GROUP,
      arguments: [
        new Argument({
          name: 'add',
          description: 'Add role (everyone)',
          type: ArgumentType.SUB_COMMAND,
          arguments: [
            new Argument({
              name: 'role',
              description: 'Select role',
              type: ArgumentType.ROLE,
              required: true,
            })
          ]
        }),
        new Argument({
          name: 'remove',
          description: 'Remove role (everyone)',
          type: ArgumentType.SUB_COMMAND,
          arguments: [
            new Argument({
              name: 'role',
              description: 'Select role',
              type: ArgumentType.ROLE,
              required: true,
            })
          ]
        })
      ]
    }),
    new Argument({
      name: 'single',
      description: 'Role for single user',
      type: ArgumentType.SUB_COMMAND_GROUP,
      arguments: [
        new Argument({
          name: 'add',
          description: 'Add role for user',
          type: ArgumentType.SUB_COMMAND,
          arguments: [
            new Argument({
              name: 'role',
              description: 'Select role',
              type: ArgumentType.ROLE,
              required: true,
            }),
            new Argument({
              name: 'user',
              description: 'Select user',
              type: ArgumentType.USER,
              required: true,
            })
          ]
        }),
        new Argument({
          name: 'remove',
          description: 'Remove role from user',
          type: ArgumentType.SUB_COMMAND,
          arguments: [
            new Argument({
              name: 'role',
              description: 'Select role',
              type: ArgumentType.ROLE,
              required: true,
            }),
            new Argument({
              name: 'user',
              description: 'Select user',
              type: ArgumentType.USER,
              required: true,
            })
          ]
        })
      ]
    })
  ],
  inhibitors: [
    new MemberPermissions({
      permissions: [PermissionsBitField.Flags.MANAGE_ROLES],
      message: 'You can\'t use this command. You need \'MANAGE_ROLES\' permissions!',
      ephemeral: true,
    }),
  ],
  run: async (ctx) => {
    // Detect what sub command group was used.
    const subgroup = ctx.arguments.getSubcommandGroup();
    const sub = ctx.arguments.getSubcommand();

    const role = ctx.arguments.getRole('role');

    if (subgroup === 'mass') {
      if (sub === 'add') {
        // Add role (everyone)
        let members = (await ctx.guild.members.fetch());
        members = [...members.values()];
        members = members.filter(m => !m.roles.cache.has(role.id));

        members.forEach((member) => {
          member.roles.add(role);
        })

        ctx.reply({
          content: `ETA: ${ms(members.length * 1000)}`
        })
      } else {
        // Remove role (everyone)
        let members = (await ctx.guild.members.fetch());
        members = [...members.values()];
        members = members.filter(m => m.roles.cache.has(role.id));

        members.forEach((member) => {
          member.roles.remove(role);
        })

        ctx.reply({
          content: `ETA: ${ms(members.length * 1000)}`
        })
      }
    } else {
      const member = ctx.arguments.getMember('user');

      if (sub === 'add') {
        // Add role to user
        if (member.roles.cache.has(role.id)) {
          ctx.reply({
            content: 'You already have this role!',
            ephemeral: true,
          })
          return;
        }
        member.roles.add(role)
          .then(() => {
            ctx.reply({
              content: 'Added!',
              ephemeral: true,
            })
          })
          .catch(e => {
            ctx.reply({
              content: e.toString(),
              ephemeral: true,
            })
          });
      } else {
        // Remove role from user
        if (!member.roles.cache.has(role.id)) {
          ctx.reply({
            content: 'You don\'t have this role!',
            ephemeral: true,
          })
          return;
        }
        member.roles.remove(role)
          .then(() => {
            ctx.reply({
              content: 'Removed!',
              ephemeral: true,
            })
          })
          .catch(e => {
            ctx.reply({
              content: e,
              ephemeral: true,
            })
          });
      }
    }
  }
})