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
var forfun_ilosc = fs.readdirSync(`commands/4fun`).length
var forfun_lista = fs.readdirSync(`commands/4fun`).join(`, `).replace(/\.js/gi, ``)
var administracyjne_ilosc = fs.readdirSync(`commands/administracyjne`).length
var administracyjne_lista = fs.readdirSync(`commands/administracyjne`).join(`, `).replace(/\.js/gi, ``)
var bot_ilosc = fs.readdirSync(`commands/bot`).length
var bot_lista = fs.readdirSync(`commands/bot`).join(`, `).replace(/\.js/gi, ``)
var muzyczne_ilosc = fs.readdirSync(`commands/muzyczne`).length
var muzyczne_lista = fs.readdirSync(`commands/muzyczne`).join(`, `).replace(/\.js/gi, ``)
var praktyczne_ilosc = fs.readdirSync(`commands/praktyczne`).length
var praktyczne_lista = fs.readdirSync(`commands/praktyczne`).join(`, `).replace(/\.js/gi, ``)
var profil_ilosc = fs.readdirSync(`commands/profil`).length
var profil_lista = fs.readdirSync(`commands/profil`).join(`, `).replace(/\.js/gi, ``)
var wszystko_ilosc = forfun_ilosc + administracyjne_ilosc + bot_ilosc + muzyczne_ilosc + praktyczne_ilosc + profil_ilosc

module.exports = {
    commands: `pomoc`,
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
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Pomoc - NiesamowityBOT`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`**Hejka! To ja NiesamowityBOT! Chciałbym pomóc Ci w rozwijaniu twojego serwera! Aktualnie posiadam ${wszystko_ilosc} komend, które można dostrzec poniżej! To jak zaczynamy przygodę?**\n\n**${emotki.wykrzyknik} | Administracyjne (${administracyjne_ilosc})**\n${administracyjne_lista}\n\n**${emotki.logobota} | Bot (${bot_ilosc})**\n${bot_lista}\n\n**:notes: | Muzyczne (${muzyczne_ilosc})**\n${muzyczne_lista}\n\n**:joy: | 4Fun (${forfun_ilosc})**\n${forfun_lista}\n\n**${emotki.discord} | Praktyczne (${praktyczne_ilosc})**\n${praktyczne_lista}\n\n**${emotki.ludzie} | Profil (${profil_ilosc})**\n${profil_lista}`)
                    .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
        }
        else {
            var embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Pomoc - NiesamowityBOT`)
                .setColor(config.kolor_embeda)
                .setDescription(`**Hejka! To ja NiesamowityBOT! Chciałbym pomóc Ci w rozwijaniu twojego serwera! Aktualnie posiadam ${wszystko_ilosc} komend, które można dostrzec poniżej! To jak zaczynamy przygodę?**\n\n**${emotki.wykrzyknik} | Administracyjne (${administracyjne_ilosc})**\n${administracyjne_lista}\n\n**${emotki.logobota} | Bot (${bot_ilosc})**\n${bot_lista}\n\n**:notes: | Muzyczne (${muzyczne_ilosc})**\n${muzyczne_lista}\n\n**:joy: | 4Fun (${forfun_ilosc})**\n${forfun_lista}\n\n**${emotki.discord} | Praktyczne (${praktyczne_ilosc})**\n${praktyczne_lista}\n\n**${emotki.ludzie} | Profil (${profil_ilosc})**\n${profil_lista}`)
                .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        }
    }
}