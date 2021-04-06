var Discord = require(`discord.js`)
var config = require(`../config.json`)
var client = new Discord.Client()
var package = require(`../package.json`)
var fs = require(`fs`)
var path = require(`path`)
var os = require('os')
var axios = require(`axios`)
var jsonWriter = require(`fs-json-writer`)

module.exports = {
    commands: `ban`,
    callback: async (message, args, text, bot) => {
        var dbmembersfiles = fs.readdirSync(`db/members`).join(`, `).replace(/\.json/gi, ``)
        if (dbmembersfiles.includes(message.author.id)) {
            var dbmembers = require(`../../db/members/${message.author.id}.json`)
            var gbancheck = dbmembers.gbancheck || `Nie!`
            var gbanreason = dbmembers.gbanreason || `Nie dotyczy!`
            var gbanexpire = dbmembers.gbanexpire || `Nie dotyczy!`
            if (gbancheck === `Tak!`) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Błąd!`)
                    .setColor(config.kolor_embeda_bledu)
                    .setDescription(`${emotki.nie} Jesteś/aś globalnie zbanowany/a!\n\n:id: Twoje id: **${message.author.id}**\nPowód: **${gbanreason}**\n${emotki.zegarek} Wygasa: **${gbanexpire}**`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            else {
                if (!message.member.permissions.has(`BAN_MEMBERS`)) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Błąd!`)
                        .setColor(config.kolor_embeda_bledu)
                        .setDescription(`${emotki.nie} Nie posiadasz uprawnień!\n${emotki.klodka} Wymagane uprawnienia: **Banowanie członków**`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                else {
                    var wzmianka = message.mentions.members.first()
                    if (!wzmianka) {
                        var embed = new Discord.MessageEmbed()
                        embed
                            .setTitle(`Błąd!`)
                            .setColor(config.kolor_embeda_bledu)
                            .setDescription(`${emotki.nie} Musisz oznaczyć osobę!`)
                            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                        message.channel.send(embed)
                    }
                    else {
                        if (!args[1]) {
                            var embed = new Discord.MessageEmbed()
                            embed
                                .setTitle(`Błąd!`)
                                .setColor(config.kolor_embeda_bledu)
                                .setDescription(`${emotki.nie} Musisz podać powód!`)
                                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                            message.channel.send(embed)
                        }
                        else {
                            wzmianka.ban({ reason: `Administrator: ${message.author.tag}` }).then(() => {
                                var embed = new Discord.MessageEmbed()
                                embed
                                    .setTitle(`Sukces!`)
                                    .setColor(config.kolor_embeda)
                                    .setDescription(`${emotki.tak} Pomyślnie zbanowano użytkownika **${wzmianka} (${wzmianka.tag})**!\n\nAdministrator: **${message.author} (${message.author.tag})**\n\nUżytkownik: **${wzmianka} (${wzmianka.tag})**\n\nPowód: **${args.splice(1).join(` `)}**\n\nSerwer: **${message.guild.name}**`)
                                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                                message.channel.send(embed)
                                wzmianka.send(embed).catch(() => { return })
                            }).catch(() => {
                                var embed = new Discord.MessageEmbed()
                                embed
                                    .setTitle(`Błąd!`)
                                    .setColor(config.kolor_embeda_bledu)
                                    .setDescription(`${emotki.nie} Bot nie posiada permisji!`)
                                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                                message.channel.send(embed)
                            });
                        }
                    }
                }
            }
        }
        else {
            if (!message.member.permissions.has(`BAN_MEMBERS`)) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Błąd!`)
                    .setColor(config.kolor_embeda_bledu)
                    .setDescription(`${emotki.nie} Nie posiadasz uprawnień!\n${emotki.klodka} Wymagane uprawnienia: **Banowanie członków**`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            else {
                var wzmianka = message.mentions.members.first()
                if (!wzmianka) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Błąd!`)
                        .setColor(config.kolor_embeda_bledu)
                        .setDescription(`${emotki.nie} Musisz oznaczyć osobę!`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                else {
                    if (!args[1]) {
                        var embed = new Discord.MessageEmbed()
                        embed
                            .setTitle(`Błąd!`)
                            .setColor(config.kolor_embeda_bledu)
                            .setDescription(`${emotki.nie} Musisz podać powód!`)
                            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                        message.channel.send(embed)
                    }
                    else {
                        wzmianka.ban({ reason: `Administrator: ${message.author.tag}` }).then(() => {
                            var embed = new Discord.MessageEmbed()
                            embed
                                .setTitle(`Sukces!`)
                                .setColor(config.kolor_embeda)
                                .setDescription(`${emotki.tak} Pomyślnie zbanowano użytkownika **${wzmianka} (${wzmianka.tag})**!\n\nAdministrator: **${message.author} (${message.author.tag})**\n\nUżytkownik: **${wzmianka} (${wzmianka.tag})**\n\nPowód: **${args.splice(1).join(` `)}**\n\nSerwer: **${message.guild.name}**`)
                                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                            message.channel.send(embed)
                            wzmianka.send(embed).catch(() => { return })
                        }).catch(() => {
                            var embed = new Discord.MessageEmbed()
                            embed
                                .setTitle(`Błąd!`)
                                .setColor(config.kolor_embeda_bledu)
                                .setDescription(`${emotki.nie} Bot nie posiada permisji!`)
                                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                            message.channel.send(embed)
                        });
                    }
                }
            }
        }
    }
}