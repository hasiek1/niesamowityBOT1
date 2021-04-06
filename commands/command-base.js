/**
 * NOTE:
 *  Some parts of this code have been improved since the original command base video.
 *  This file should still work as expected, however if you are learning the inner workings of
 *  this file then expect the file to be slightly different than in the video.
 */

var Discord = require(`discord.js`)
var config = require(`../config.json`)
var prefix = config.prefix

var validatePermissions = (permissions) => {
  var validPermissions = [
    `CREATE_INSTANT_INVITE`,
    `KICK_MEMBERS`,
    `BAN_MEMBERS`,
    `ADMINISTRATOR`,
    `MANAGE_CHANNELS`,
    `MANAGE_GUILD`,
    `ADD_REACTIONS`,
    `VIEW_AUDIT_LOG`,
    `PRIORITY_SPEAKER`,
    `STREAM`,
    `VIEW_CHANNEL`,
    `SEND_MESSAGES`,
    `SEND_TTS_MESSAGES`,
    `MANAGE_MESSAGES`,
    `EMBED_LINKS`,
    `ATTACH_FILES`,
    `READ_MESSAGE_HISTORY`,
    `MENTION_EVERYONE`,
    `USE_EXTERNAL_EMOJIS`,
    `VIEW_GUILD_INSIGHTS`,
    `CONNECT`,
    `SPEAK`,
    `MUTE_MEMBERS`,
    `DEAFEN_MEMBERS`,
    `MOVE_MEMBERS`,
    `USE_VAD`,
    `CHANGE_NICKNAME`,
    `MANAGE_NICKNAMES`,
    `MANAGE_ROLES`,
    `MANAGE_WEBHOOKS`,
    `MANAGE_EMOJIS`,
  ]

  for (var permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node ${permission}`)
    }
  }
}
var recentlyRan = []
module.exports = (client, commandOptions) => {

  var {
    commands,
    expectedArgs = ``,
    permissionError = `Nie posiadasz uprawnień!`,
    minArgs = 0,
    maxArgs = null,
    cooldown = 0,
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions

  // Ensure the command and aliases are in an array
  if (typeof commands === `string`) {
    commands = [commands]
  }

  console.log(`✅ | Komenda ${prefix}${commands[0]} działa!`)

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === `string`) {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  // Listen for messages
  client.on(`message`, async (message) => {

    if (message.channel.type === `dm` || message.author.bot) return;
    var { member, content, guild } = message
    var embed = new Discord.MessageEmbed();
    for (var alias of commands) {
      var command = `${prefix}${alias.toLowerCase()}`
      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command
      ) {


        for (var permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError)
            return
          }
        }

        // Ensure the user has the required roles
        for (var requiredRole of requiredRoles) {
          var role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `Musisz posiadać rolę ${requiredRole} aby używać tej komendy!`
            )
            return
          }
        }
        // Ensure the user has not ran this command too frequently
        //guildId-userId-command
        var cooldownString = `${guild.id}-${member.id}-${commands[0]}`
        if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
          embed
            .setTitle(`Błąd!`)
            .setColor(config.kolor_embeda_bledu)
            .setDescription(`${emotki.nie} Musisz poczekać przed ponownym użyciem tej komendy!`)
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
          return message.channel.send(embed)
        }



        // Split on any number of spaces
        var args = content.split(/[ ]+/)

        // Remove the command which is the first index
        args.shift()

        // Ensure we have the correct number of args
        if (
          args.length < minArgs ||
          (maxArgs !== null && args.length > maxArgs)
        ) {
          message.reply(
            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
          )
          return
        }
        if (cooldown > 0) {
          recentlyRan.push(cooldownString)

          setTimeout(() => {

            recentlyRan = recentlyRan.filter((string) => {
              return string !== cooldownString
            })

          }, 1000 * cooldown)
        }
        // Handle the custom command code
        callback(message, args, args.join(` `), client)
        return

      }
    }
  })
}