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
    commands: `kotek`,
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
                var liczba = Math.floor(Math.random() * 23) + 1
                switch (liczba) {
                    case 1: var resp = "https://www.koty.pl/wp-content/uploads/2017/11/shutterstock_330164483-864x575.jpg"; break;
                    case 2: var resp = "https://dziendobry.tvn.pl/media/cache/content_cover/imie-dla-kotki-jak-wybrac-oryginalne-imie-i-dobrze-dopasowac-je-do-kotki-jpg.jpg"; break;
                    case 3: var resp = "https://petportal.pl/wp-content/uploads/2020/08/S%C5%82odkie-kotki-dlaczego-kocie%CC%A8ta-sa%CC%A8-takie-s%C5%82odkie-740x444.jpg"; break;
                    case 4: var resp = "https://cdn.wamiz.pl/uploads/article/images/Wamiz%20PL/koty/kocieta/kotki.jpg"; break;
                    case 5: var resp = "https://rzeszow-news.pl/wp-content/uploads/2019/07/cat-4282123_1280.jpg"; break;
                    case 6: var resp = "https://www.perfect-fit.pl/media/14648/cat_m8_sleep_1_d.jpg?anchor=center&mode=crop&width=1600&height=700&rnd=132143023930000000"; break;
                    case 7: var resp = "https://www.maxandmrau.pl/data/include/img/news/1549878209.jpg"; break;
                    case 8: var resp = "https://www.koty.pl/wp-content/uploads/2020/02/kociak-na-kaloryferze-864x575.jpg"; break;
                    case 9: var resp = "https://www.koty.pl/wp-content/uploads/2019/06/dwa-kociaki-e1562594184811.jpg"; break;
                    case 10: var resp = "https://www.zooplus.pl/magazyn/wp-content/uploads/2017/12/potomstwo-kota-domowego-1024x680.jpg"; break;
                    case 11: var resp = "https://myanimals.com/pl/wp-content/uploads/2020/07/kotka-z-kociakami.jpg"; break;
                    case 12: var resp = "https://www.koty.pl/wp-content/uploads/2019/02/koty-sie-bija-3-e1550495649537.jpg"; break;
                    case 13: var resp = "https://cdn.wamiz.pl/media/cache/upload_og-image/uploads/article/main-picture/5c45a91567f41712100377.jpg"; break;
                    case 14: var resp = "https://www.koty.pl/wp-content/uploads/2019/07/kotki-e1562594529465.jpg"; break;
                    case 15: var resp = "https://www.koty.pl/wp-content/uploads/2016/11/shutterstock_298595282-e1512170165593.jpg"; break;
                    case 16: var resp = "https://www.koty.pl/wp-content/uploads/2018/03/dwa-koty.png"; break;
                    case 17: var resp = "https://www.koty.pl/wp-content/uploads/2017/12/shutterstock_244841041-e1513168116625.jpg"; break;
                    case 18: var resp = "https://www.koty.pl/wp-content/uploads/2017/09/shutterstock_356079284-e1504609466724.jpg"; break;
                    case 19: var resp = "https://d-pt.ppstatic.pl/k/r/1/24/ed/58a614bec340d_p.jpg?1492479906"; break;
                    case 20: var resp = "https://www.koty.pl/wp-content/uploads/2020/07/shutterstock_301782632-e1594148856305.jpg"; break;
                    case 21: var resp = "https://www.werandacountry.pl/cache/832-500/bfe41a533e4ae75fe529cc4ccb6c5a63/13190_1329309743.jpg"; break;
                    case 22: var resp = "https://www.werandacountry.pl/cache/832-500/bfe41a533e4ae75fe529cc4ccb6c5a63/13190_1329309743.jpg"; break;
                    case 23: var resp = "https://dziendobry.tvn.pl/media/cache/content_cover/gettyimages-855294700-jpg.jpg"; break;
                }
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Kotek`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Oto kotek dla Ciebie!`)
                    .setImage(resp)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
        }
        else {
            var liczba = Math.floor(Math.random() * 23) + 1
            switch (liczba) {
                case 1: var resp = "https://www.koty.pl/wp-content/uploads/2017/11/shutterstock_330164483-864x575.jpg"; break;
                case 2: var resp = "https://dziendobry.tvn.pl/media/cache/content_cover/imie-dla-kotki-jak-wybrac-oryginalne-imie-i-dobrze-dopasowac-je-do-kotki-jpg.jpg"; break;
                case 3: var resp = "https://petportal.pl/wp-content/uploads/2020/08/S%C5%82odkie-kotki-dlaczego-kocie%CC%A8ta-sa%CC%A8-takie-s%C5%82odkie-740x444.jpg"; break;
                case 4: var resp = "https://cdn.wamiz.pl/uploads/article/images/Wamiz%20PL/koty/kocieta/kotki.jpg"; break;
                case 5: var resp = "https://rzeszow-news.pl/wp-content/uploads/2019/07/cat-4282123_1280.jpg"; break;
                case 6: var resp = "https://www.perfect-fit.pl/media/14648/cat_m8_sleep_1_d.jpg?anchor=center&mode=crop&width=1600&height=700&rnd=132143023930000000"; break;
                case 7: var resp = "https://www.maxandmrau.pl/data/include/img/news/1549878209.jpg"; break;
                case 8: var resp = "https://www.koty.pl/wp-content/uploads/2020/02/kociak-na-kaloryferze-864x575.jpg"; break;
                case 9: var resp = "https://www.koty.pl/wp-content/uploads/2019/06/dwa-kociaki-e1562594184811.jpg"; break;
                case 10: var resp = "https://www.zooplus.pl/magazyn/wp-content/uploads/2017/12/potomstwo-kota-domowego-1024x680.jpg"; break;
                case 11: var resp = "https://myanimals.com/pl/wp-content/uploads/2020/07/kotka-z-kociakami.jpg"; break;
                case 12: var resp = "https://www.koty.pl/wp-content/uploads/2019/02/koty-sie-bija-3-e1550495649537.jpg"; break;
                case 13: var resp = "https://cdn.wamiz.pl/media/cache/upload_og-image/uploads/article/main-picture/5c45a91567f41712100377.jpg"; break;
                case 14: var resp = "https://www.koty.pl/wp-content/uploads/2019/07/kotki-e1562594529465.jpg"; break;
                case 15: var resp = "https://www.koty.pl/wp-content/uploads/2016/11/shutterstock_298595282-e1512170165593.jpg"; break;
                case 16: var resp = "https://www.koty.pl/wp-content/uploads/2018/03/dwa-koty.png"; break;
                case 17: var resp = "https://www.koty.pl/wp-content/uploads/2017/12/shutterstock_244841041-e1513168116625.jpg"; break;
                case 18: var resp = "https://www.koty.pl/wp-content/uploads/2017/09/shutterstock_356079284-e1504609466724.jpg"; break;
                case 19: var resp = "https://d-pt.ppstatic.pl/k/r/1/24/ed/58a614bec340d_p.jpg?1492479906"; break;
                case 20: var resp = "https://www.koty.pl/wp-content/uploads/2020/07/shutterstock_301782632-e1594148856305.jpg"; break;
                case 21: var resp = "https://www.werandacountry.pl/cache/832-500/bfe41a533e4ae75fe529cc4ccb6c5a63/13190_1329309743.jpg"; break;
                case 22: var resp = "https://www.werandacountry.pl/cache/832-500/bfe41a533e4ae75fe529cc4ccb6c5a63/13190_1329309743.jpg"; break;
                case 23: var resp = "https://dziendobry.tvn.pl/media/cache/content_cover/gettyimages-855294700-jpg.jpg"; break;
            }
            var embed = new Discord.MessageEmbed()
            embed
                .setTitle(`Kotek`)
                .setColor(config.kolor_embeda)
                .setDescription(`Oto kotek dla Ciebie!`)
                .setImage(resp)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        }
    }
}