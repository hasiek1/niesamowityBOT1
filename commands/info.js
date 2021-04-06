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
    commands: `info`,
    callback: async (message, args, text, bot,) => {
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
                var wersjadiscordjs = package.dependencies[`discord.js`].replace(/\^/gi, `v`)
                var totalSeconds = (bot.uptime / 1000);
                var days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
                var hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = Math.floor(totalSeconds % 60);
                var botuptime = (days > 0 ? days + "d, " : "") + (hours > 0 ? hours + "h, " : "") + (minutes > 0 ? minutes + "m, " : "") + (seconds > 0 ? seconds + "s" : "")
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Info - NiesamowityBOT`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Ten serwer działa na shardzie o id **1**, korzysta z niego **${bot.guilds.cache.size}** serwerów!\n\n${emotki.pamiecram} Użycie ramu: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB**\n\n${emotki.uptime} Uptime: **${botuptime}**\n\n:file_cabinet: Serwery: **${bot.guilds.cache.size}**\n\n${emotki.ludzie} Użytkownicy: **${bot.users.cache.size}**\n\n:file_folder: Kanały: **${bot.channels.cache.filter(c => c.type === `text`).size}**\n\n${emotki.nodejs} Wersja node.js: **v${process.versions.node}**\n\n${emotki.discordjs} Wersja discord.js: **${wersjadiscordjs}**\n\n${emotki.krysztalki} Platforma maszyny: **Linux**\n\n:diamond_shape_with_a_dot_inside: Shardy: **1**\n\n:ping_pong: Ping bota: **${message.client.ws.ping}ms**`)
                    .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
        }
        else {
            var wersjadiscordjs = package.dependencies[`discord.js`].replace(/\^/gi, `v`)
            var totalSeconds = (bot.uptime / 1000);
            var days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            var hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = Math.floor(totalSeconds % 60);
            var botuptime = (days > 0 ? days + "d, " : "") + (hours > 0 ? hours + "h, " : "") + (minutes > 0 ? minutes + "m, " : "") + (seconds > 0 ? seconds + "s" : "")
            var embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Info - NiesamowityBOT`)
                .setColor(config.kolor_embeda)
                .setDescription(`Ten serwer działa na shardzie o id **1**, korzysta z niego **${bot.guilds.cache.size}** serwerów!\n\n${emotki.pamiecram} Użycie ramu: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB**\n\n${emotki.uptime} Uptime: **${botuptime}**\n\n:file_cabinet: Serwery: **${bot.guilds.cache.size}**\n\n${emotki.ludzie} Użytkownicy: **${bot.users.cache.size}**\n\n:file_folder: Kanały: **${bot.channels.cache.filter(c => c.type === `text`).size}**\n\n${emotki.nodejs} Wersja node.js: **v${process.versions.node}**\n\n${emotki.discordjs} Wersja discord.js: **${wersjadiscordjs}**\n\n${emotki.krysztalki} Platforma maszyny: **Linux**\n\n:diamond_shape_with_a_dot_inside: Shardy: **1**\n\n:ping_pong: Ping bota: **${message.client.ws.ping}ms**`)
                .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        }
    }
}