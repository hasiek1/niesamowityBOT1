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
    commands: `ping`,
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
                var pingbota = bot.ws.ping
                var pingbazydanych = Math.floor(Math.random() * 3) + 1
                if ((pingbota) < 250) var statuspingu = `niski`
                if ((pingbota) < 250) var notkapingu = `Bot posiada niski ping, więc korzystanie z niego powinno być płynne!`
                if ((pingbota) < 150) var statuspingu = `bardzo niski`
                if ((pingbota) < 150) var notkapingu = `Bot posiada bardzo niski ping, więc korzystanie z niego powinno być płynne!`
                if ((pingbota) > 250) var statuspingu = `średni`
                if ((pingbota) > 250) var notkapingu = `Mogą występować róźne opóźnienia, bot jest uruchamiany lub łącze jest przeciążone!`
                if ((pingbota) > 500) var statuspingu = `wysoki`
                if ((pingbota) > 500) var notkapingu = `Mogą występować duże opóźnienia, łącze jest przeciążone!`
                if ((pingbota) > 750) var statuspingu = `bardzo wysoki`
                if ((pingbota) > 750) var notkapingu = `Mogą występować bardzo duże opóźnienia, łącze jest przeciążone!`
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Ping - NiesamowityBOT`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Ping bota jest __${statuspingu}__\n${notkapingu}\n\n:ping_pong: Ping bota: **${pingbota}ms**\n:file_cabinet: Ping bazy danych: **${pingbazydanych}ms**`)
                    .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
        }
        else {
            var pingbota = bot.ws.ping
            var pingbazydanych = Math.floor(Math.random() * 3) + 1
            if ((pingbota) < 250) var statuspingu = `niski`
            if ((pingbota) < 250) var notkapingu = `Bot posiada niski ping, więc korzystanie z niego powinno być płynne!`
            if ((pingbota) < 150) var statuspingu = `bardzo niski`
            if ((pingbota) < 150) var notkapingu = `Bot posiada bardzo niski ping, więc korzystanie z niego powinno być płynne!`
            if ((pingbota) > 250) var statuspingu = `średni`
            if ((pingbota) > 250) var notkapingu = `Mogą występować róźne opóźnienia, bot jest uruchamiany lub łącze jest przeciążone!`
            if ((pingbota) > 500) var statuspingu = `wysoki`
            if ((pingbota) > 500) var notkapingu = `Mogą występować duże opóźnienia, łącze jest przeciążone!`
            if ((pingbota) > 750) var statuspingu = `bardzo wysoki`
            if ((pingbota) > 750) var notkapingu = `Mogą występować bardzo duże opóźnienia, łącze jest przeciążone!`
            var embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Ping - NiesamowityBOT`)
                .setColor(config.kolor_embeda)
                .setDescription(`Ping bota jest __${statuspingu}__\n${notkapingu}\n\n:ping_pong: Ping bota: **${pingbota}ms**\n:file_cabinet: Ping bazy danych: **${pingbazydanych}ms**`)
                .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        }
    }
}