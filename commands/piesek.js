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
    commands: `piesek`,
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
                var url = `https://some-random-api.ml/img/dog`
                var data, response;
                try {
                    response = await axios.get(url);
                    data = response.data;
                } catch (e) { }

                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Piesek`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Oto piesek dla Ciebie!`)
                    .setImage(data.link)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
        }
        else {
            var url = `https://some-random-api.ml/img/dog`
            var data, response;
            try {
                response = await axios.get(url);
                data = response.data;
            } catch (e) { }

            var embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Piesek`)
                .setColor(config.kolor_embeda)
                .setDescription(`Oto piesek dla Ciebie!`)
                .setImage(data.link)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        }
    }
}