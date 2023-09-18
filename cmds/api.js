const { Discord, EmbedBuilder, CommandInteractionOptionResolver } = require("discord.js");
const { Command, Inhibitor: { MemberPermissions, UserOnly }, CommandType, Argument, ArgumentType } = require("gcommands");
const fs = require('fs-extra')
const { request } = require('undici');
const mysql = require('mysql');
const info = {
  name: "api",
  showName: "API Management",
  description: "Interacts with https://api.favoslav.cz/v1/oauth2 api",
  legend: [
    "``/api oauth2 (renew)``: Renews dsc oauth2 users tokens if possible",
    "``/api ypass add``: Adds new user (access) to YiffDB",
    "``/api ypass edit``: Edits users access data for YiffDB",
    "``/api ypass show``: Shows all registered users on YiffDB",
    "``/api ypass remove``: Removes users data from YiffDB",
  ],
  inhibitors: {
    UserOnly: 553946762289610785,
    MemberPermissions: ['MANAGE_MESSAGES'],
  },
  type: [CommandType.SLASH]
}
new Command({
  name: info.name,
  description: info.description,
  type: info.type,
  arguments: [
    new Argument({
      name: 'ypass',
      description: 'YiffDB password manager.',
      type: ArgumentType.SUB_COMMAND_GROUP,
      arguments: [
        new Argument({
          name: 'add',
          description: 'Password manager => add pass.',
          type: ArgumentType.SUB_COMMAND,
          arguments: [
            new Argument({
              name: 'ctid',
              description: 'ID of content to show.',
              type: ArgumentType.INTEGER,
              required: true,
            }),
            new Argument({
              name: 'usrnm',
              description: 'Name of the user.',
              type: ArgumentType.STRING,
              required: true,
            }),
            new Argument({
              name: 'dscid',
              description: 'Discord ID of the user.',
              type: ArgumentType.STRING,
              required: false,
            }),
            new Argument({
              name: 'custom',
              description: 'Create custom password. None if random.',
              type: ArgumentType.STRING,
              required: false,
            }),
            new Argument({
              name: 'random',
              description: 'Generate random password. True if yes.',
              type: ArgumentType.BOOLEAN,
              required: false,
            })
          ]
        }),
        new Argument({
          name: 'remove',
          description: 'Password manager => delete pass.',
          type: ArgumentType.SUB_COMMAND,
          arguments: [
            new Argument({
              name: 'id',
              description: 'Delete by id.',
              type: ArgumentType.INTEGER,
              required: true,
            })
          ]
        }),
        new Argument({
          name: 'edit',
          description: 'Password manager => edit user\'s info by id.',
          type: ArgumentType.SUB_COMMAND,
          arguments: [
            new Argument({
              name: 'id',
              description: 'Edit by id.',
              type: ArgumentType.INTEGER,
              required: true,
            })
          ]
        }),
        new Argument({
          name: 'show',
          description: 'Password manager => Show all users (id, name and discord id)',
          type: ArgumentType.SUB_COMMAND,
          arguments: []
        }),
      ]
    }),
    new Argument({
      name: 'oauth2',
      description: 'OAUTH2 manager.',
      type: ArgumentType.SUB_COMMAND,
      arguments: [
        new Argument({
          name: 'renew',
          description: 'Renew OAUTH2 collected data. True if yes.',
          type: ArgumentType.BOOLEAN,
          required: false,
        })
      ]
    }),
  ],
  inhibitors: [
    new UserOnly({
      ids: ['553946762289610785'],
      message: 'You can\'t use this command!',
      ephemeral: true,
    }),
  ],
  // DmAvailable: false,
  run: async (ctx) => {
    const subgroup = ctx.arguments.getSubcommandGroup();
    const sub = ctx.arguments.getSubcommand();

    const random = ctx.arguments.getBoolean('random') || false;
    const ctid = ctx.arguments.getInteger('ctid');
    const id = ctx.arguments.getInteger('id');
    const custom = ctx.arguments.getString('custom');
    const renew = ctx.arguments.getBoolean('renew') || true;
    const usrnm = ctx.arguments.getString('usrnm');
    const dscid = ctx.arguments.getString('dscid') || null;

    var eph = true;

    if (subgroup === 'ypass') {
      if (sub === 'add') {
        if (random == true) {
          function generateRanKey() {
            const { randomBytes } = require('crypto');
            const key = randomBytes(8).toString('hex')
            const hashedKey = hashKey(key);

            if (key[hashedKey]) {
              generateRanKey();
            } else {
              return { hashedKey, key };
            }
          }

          function hashKey(key) {
            const { createHash } = require('crypto');
            const hashedKey = createHash('sha256').update(key).digest('hex');
            return hashedKey;
          }
          generateRanKey()

        } else if (custom) {
          function generateRanKey() {
            const key = custom.toString('hex')
            const hashedKey = hashKey(key);

            if (key[hashedKey]) {
              generateRanKey();
            } else {
              return { hashedKey, key };
            }
          }

          function hashKey(key) {
            const { createHash } = require('crypto');
            const hashedKey = createHash('sha256').update(key).digest('hex');
            return hashedKey;
          }
        } else return false;

        const { hashedKey, key } = generateRanKey()

        require("dotenv").config({ path: '/home/mrbb_bot/.env' });
        //console.log(process.env.HOST, process.env.DBUSER85, process.env.PASS, process.env.PORT)
        const connection = mysql.createConnection({
          host: process.env.HOST,
          user: process.env.DBUSER85,
          password: process.env.PASS,
          database: 'yiff_db',
          port: process.env.PORT,
        });

        connection.connect((error) => {
          if (error) {
            const scopeEmbed = new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle('https://favoslav.cz/yiff_db/')
              .setDescription('Something went wrong.')
              .setAuthor({
                name: ctx.user.tag,
                iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
              })
              .addFields({
                name: `Error:`,
                value: `${error}`,
              })
            return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
          }
          console.log('--> Connection established sucessfully');
        });

        connection.query("SELECT id FROM yiff_db_secstor ORDER BY id DESC LIMIT 1", async function (err, result, fields) {
          if (err) {
            const scopeEmbed = await new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle('https://favoslav.cz/yiff_db/')
              .setDescription('Something went wrong.')
              .setAuthor({
                name: ctx.user.tag,
                iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
              })
              .addFields({
                name: `Error:`,
                value: `${err}`,
              })
            return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
          }

          try {
            if (result == '') { var ID = 0 };
            if (result !== '') { var ID = result[0].id + 1 };
          }
          catch (err) { console.log('Error:', err.message) }

          connection.query(`SELECT usrnm FROM yiff_db_secstor WHERE usrnm = '${usrnm}'`, async function (err, result, field) {
            if (result.length === 0) {
              connection.query(`INSERT INTO yiff_db_secstor (id, ctid, usrnm, pass, dsc_id) VALUES (${ID}, ${ctid}, '${usrnm}', '${hashedKey}', ${dscid})`, async function (err, result) {
                if (err) {
                  const scopeEmbed = await new EmbedBuilder()
                    .setColor("#ff0000")
                    .setTitle('https://favoslav.cz/yiff_db/')
                    .setDescription('Something went wrong.')
                    .setAuthor({
                      name: ctx.user.tag,
                      iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
                    })
                    .addFields({
                      name: `Error:`,
                      value: `${err}`,
                    })
                  return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
                }
                console.log("1 record inserted");
                connection.end();
              });

              const scopeEmbed = await new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle('https://favoslav.cz/yiff_db/')
                .setAuthor({
                  name: ctx.user.tag,
                  iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
                })
                .addFields({
                  name: `Original key:`,
                  value: `${key}`,
                }, {
                  name: `Hashed key:`,
                  value: `${hashedKey}`,
                }, {
                  name: `ID:`,
                  value: `${ID}`,
                }, {
                  name: `Content ID:`,
                  value: `${ctid}`,
                }, {
                  name: `User's name:`,
                  value: `${usrnm}`,
                }, {
                  name: `User's Discord ID:`,
                  value: `${dscid ?? 'Not set'}`,
                })
              return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
            } else if (result.length === 1) {
              const scopeEmbed = await new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle('https://favoslav.cz/yiff_db/')
                .setDescription('This user already exists!')
                .setAuthor({
                  name: ctx.user.tag,
                  iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
                })
              return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
            }
          });
        });
      } else if (sub === 'remove') {

        require("dotenv").config({ path: '/home/mrbb_bot/.env' });
        const connection = mysql.createConnection({
          host: process.env.HOST,
          user: process.env.DBUSER85,
          password: process.env.PASS,
          database: 'yiff_db',
          port: process.env.PORT,
        });

        connection.connect((error) => {
          if (error) {
            const scopeEmbed = new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle('https://favoslav.cz/yiff_db/')
              .setDescription('Something went wrong.')
              .setAuthor({
                name: ctx.user.tag,
                iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
              })
              .addFields({
                name: `Error:`,
                value: `${error}`,
              })
            return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
          }
          console.log('--> Connection established sucessfully');
        });

        connection.query(`SELECT * FROM yiff_db_secstor WHERE id = ${id}`, async function (err, result, field) {
          if (err) {
            const scopeEmbed = await new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle('https://favoslav.cz/yiff_db/')
              .setDescription('Something went wrong.')
              .setAuthor({
                name: ctx.user.tag,
                iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
              })
              .addFields({
                name: `Error:`,
                value: `${error}`,
              })
            connection.end();
            return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
          };

          const scopeEmbed = await new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle('https://favoslav.cz/yiff_db/')
            .setAuthor({
              name: ctx.user.tag,
              iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
            })
            .addFields({
              name: `Hashed key:`,
              value: `${result[0].pass}`,
            }, {
              name: `ID:`,
              value: `${result[0].id}`,
            }, {
              name: `Content ID:`,
              value: `${result[0].ctid}`,
            }, {
              name: `User's name:`,
              value: `${result[0].usrnm}`,
            }, {
              name: `User's Discord ID:`,
              value: `${result[0].dsc_id ?? 'Not set'}`,
            })
          connection.query(`DELETE FROM yiff_db_secstor WHERE id = ${id}`, async function (error, results, fields) {
            if (error) {
              const scopeEmbed = await new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle('https://favoslav.cz/yiff_db/')
                .setDescription('Something went wrong.')
                .setAuthor({
                  name: ctx.user.tag,
                  iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
                })
                .addFields({
                  name: `Error:`,
                  value: `${error}`,
                })
              connection.end();
              return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
            };
            console.log('Deleted ' + results.affectedRows + ' rows.');
          });
          connection.end();
          return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
        })
      } else if (sub === 'show') {
        require("dotenv").config({ path: '/home/mrbb_bot/.env' });
        const connection = mysql.createConnection({
          host: process.env.HOST,
          user: process.env.DBUSER85,
          password: process.env.PASS,
          database: 'yiff_db',
          port: process.env.PORT,
        });

        connection.connect((error) => {
          if (error) {
            const scopeEmbed = new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle('https://favoslav.cz/yiff_db/')
              .setDescription('Something went wrong.')
              .setAuthor({
                name: ctx.user.tag,
                iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
              })
              .addFields({
                name: `Error:`,
                value: `${error}`,
              })
            return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
          }
          console.log('--> Connection established sucessfully');
        });

        connection.query(`SELECT id, usrnm, dsc_id FROM yiff_db_secstor`, async function (err, result, field) {
          if (err) {
            const scopeEmbed = await new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle('https://favoslav.cz/yiff_db/')
              .setDescription('Something went wrong.')
              .setAuthor({
                name: ctx.user.tag,
                iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
              })
              .addFields({
                name: `Error:`,
                value: `${error}`,
              })
            connection.end();
            return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
          };

          console.log(result)
          const scopeEmbed = await new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle('https://favoslav.cz/yiff_db/')
            .setAuthor({
              name: ctx.user.tag,
              iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
            })

          for (const row of result) {
            scopeEmbed.addFields({
              name: `ID: ${row.id}`,
              value: `Username: ${row.usrnm}\nDiscord ID: ${row.dsc_id ?? 'Not set'}`,
            });
          }
          connection.end();
          return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
        })
      } else if (sub === 'edit') {
        return ctx.safeReply({ content: '**This command is not avalaible yet...**', ephemeral: true });
      }
    } else if (sub === 'oauth2') {
      if (renew == true) {

        require("dotenv").config({ path: '/home/api/.env' });
        await fetch('https://api.favoslav.cz/v1/oauth2/renew', {
          headers: {Authorization: `Bearer ${process.env.API_TOKEN}`}
        })
          .then(response => {
            const contentType = response.headers.get('content-type');
            const cacheControl = response.headers.get('cache-control');

            return response.json();
          })
          .then(data => {
            console.log(data);

            const embed = new EmbedBuilder()
              .setTitle('Refresh Token Status https://api.favoslav.cz/v1/oauth2/renew')
              .setColor("#ff0000")
              .setAuthor({
                name: ctx.user.tag,
                iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
              })
              .addFields(
                Object.entries(data).map(([key, value]) => {
                  return { name: key, value: `Refresh Token: ${value.refresh_token}\nStatus Code: ${value.statusCode}` };
                })
              );

            if (fs.existsSync('/home/mrbb_app/cache/data.json')) {
              fs.rmSync('/home/mrbb_app/cache/data.json', { recursive: true });
            }
            return ctx.safeReply({ embeds: [embed], ephemeral: eph });
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  },
});
module.exports = info;