const { Discord, EmbedBuilder, CommandInteractionOptionResolver } = require("discord.js");
const { Command, Inhibitor: { MemberPermissions, UserOnly }, CommandType, Argument, ArgumentType } = require("gcommands");
const fs = require('fs-extra')
const { request } = require('undici');
new Command({
  name: "api",
  description: "Interacts with https://oauth2.favoslav-dev.tk api.",
  type: [CommandType.SLASH],
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
              type: ArgumentType.STRING,
              required: true,
            })
          ]
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
          required: true,
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
  run: async (ctx) => {
    const subgroup = ctx.arguments.getSubcommandGroup();
    const sub = ctx.arguments.getSubcommand();

    const random = ctx.arguments.getBoolean('random') || false;
    const ctid = ctx.arguments.getInteger('ctid');
    const custom = ctx.arguments.getString('custom');
    const renew = ctx.arguments.getBoolean('renew');
    const usrnm = ctx.arguments.getString('usrnm');

    var eph = true;

    if (subgroup === 'ypass') {
      if (sub === 'add') {
        if (random == true) {
          function generateRanKey() {
            const { randomBytes } = require('crypto');
            const key = randomBytes(24).toString('hex')
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

        const mysql = require('mysql');
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
            console.log('--> Error connecting to the MySQL Database', error);
            return;
          }
          console.log('--> Connection established sucessfully');
        });

        connection.query("SELECT id FROM yiff_db_secstor ORDER BY id DESC LIMIT 1", async function (err, result, fields) {
          if (err) {
            const scopeEmbed = await new EmbedBuilder()
              .setColor("#ff0000")
              .setTitle('https://favoslav.tk/yiff_db/')
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
              connection.query(`INSERT INTO yiff_db_secstor (id, ctid, usrnm, pass) VALUES ('${ID}', '${ctid}', '${usrnm}', '${hashedKey}')`, async function (err, result) {
                if (err) {
                  const scopeEmbed = await new EmbedBuilder()
                    .setColor("#ff0000")
                    .setTitle('https://favoslav.tk/yiff_db/')
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
              });

              const scopeEmbed = await new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle('https://favoslav.tk/yiff_db/')
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
                })
              return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
            } else if (result.length === 1) {
              const scopeEmbed = await new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle('https://favoslav.tk/yiff_db/')
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
      }
    } else if (sub === 'oauth2') {
      if (renew == true) {
        const root_folder = fs.readdirSync('/home/mrbb_app/data/user_data/');
        root_folder.forEach(async (reslt) => {
          const { access_token, token_type } = require(`/home/mrbb_app/data/user_data/${reslt}/oauthData.json`);
          const userResult = await request('https://discord.com/api/users/@me', {
            headers: { authorization: `${token_type} ${access_token}`, },
          });
          const userResultData = await userResult.body.json();
          const userResultDataStringify = JSON.stringify(userResultData, null, 4)
          if (userResultData === undefined) return console.log('userResultData is undefined.')
          fs.mkdirSync(`/home/mrbb_app/data/user_data/${userResultData.id}`, { recursive: true })
          //fs.writeFile(`/home/mrbb_app/data/user_data2/${userResultData.id}/oauthData.json`, oauthDataStringify, (err) => { if (err) throw err; })
          fs.writeFile(`/home/mrbb_app/data/user_data/${userResultData.id}/userResultData.json`, userResultDataStringify, (err) => { if (err) throw err; })
        });

        const scopeEmbed = await new EmbedBuilder()
          .setColor("#ff0000")
          .setTitle('https://oauth2.favoslav-dev.tk')
          .setAuthor({
            name: ctx.user.tag,
            iconURL: ctx.user.displayAvatarURL({ dynamic: true }),
          })
          .addFields({
            name: `State`,
            value: `All of authorized users data has been renewed.`,
          })
        return ctx.safeReply({ embeds: [scopeEmbed], ephemeral: eph });
      }
    }
  },
});