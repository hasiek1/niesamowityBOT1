var Discord = require(`discord.js`)
var config = require(`../../config.json`)
var client = new Discord.Client()
var package = require(`../../package.json`)
var emotki = require(`../../emotki.json`)
var fs = require(`fs`)
var path = require(`path`)
var os = require('os')
var axios = require(`axios`)
var jsonWriter = require(`fs-json-writer`)

module.exports = {
    commands: `zglos`,
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
                var wzmianka = message.mentions.users.first()
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
                    var powod = args.splice(1).join(` `)
                    if (!powod) {
                        var embed = new Discord.MessageEmbed()
                        embed
                            .setTitle(`Błąd!`)
                            .setColor(config.kolor_embeda_bledu)
                            .setDescription(`${emotki.nie} Musisz podać powód!`)
                            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                        message.channel.send(embed)
                    }
                    else {
                        var embed = new Discord.MessageEmbed()
                        embed
                            .setTitle(`Sukces!`)
                            .setColor(config.kolor_embeda)
                            .setDescription(`${emotki.tak} Pomyślnie wysłano zgłoszenie na [serwer developerski](https://niesamowitybot.com.pl/dc)!`)
                            .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                        message.channel.send(embed)
                        var serwerdev = bot.guilds.cache.get(`767092790903177237`)
                        var kanal = serwerdev.channels.cache.get(`814064081778638869`)
                        var embed = new Discord.MessageEmbed()
                        embed
                            .setTitle(`${emotki.swiatelko} Nowe zgłoszenie! ${emotki.swiatelko}`)
                            .setColor(config.kolor_embeda)
                            .setDescription(`Osoba zgłaszająca: **${message.author} (${message.author.tag})**\nOsoba zgłoszona: **${wzmianka} (${wzmianka.tag})**\nPowód zgłoszenia: **${powod}**`)
                            .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                        kanal.send(embed)
                    }
                }
            }
        }
        else {
            var wzmianka = message.mentions.users.first()
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
                var powod = args.splice(1).join(` `)
                if (!powod) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Błąd!`)
                        .setColor(config.kolor_embeda_bledu)
                        .setDescription(`${emotki.nie} Musisz podać powód!`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                else {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Sukces!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`${emotki.tak} Pomyślnie wysłano zgłoszenie na [serwer developerski](https://niesamowitybot.com.pl/dc)!`)
                        .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                    var serwerdev = bot.guilds.cache.get(`767092790903177237`)
                    var kanal = serwerdev.channels.cache.get(`814064081778638869`)
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`${emotki.swiatelko} Nowe zgłoszenie! ${emotki.swiatelko}`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Osoba zgłaszająca: **${message.author} (${message.author.tag})**\nOsoba zgłoszona: **${wzmianka} (${wzmianka.tag})**\nPowód zgłoszenia: **${powod}**`)
                        .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    kanal.send(embed)
                }
            }
        }
    }
}