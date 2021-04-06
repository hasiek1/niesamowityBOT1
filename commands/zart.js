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
    commands: `zart`,
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
                var liczba = Math.floor(Math.random() * 13) + 1
                if (liczba === 1) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Blondynka pyta brunetkę:\n- Masz chipsy prosto z pieca?\n- Nie, z paczki`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 2) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Dlaczego tost nie strzelił gola?\n- Bo był spalony :joy:`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 3) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Ojciec rozmawia z Jasiem po wywiadówce:\n- Czemu znowu dostałeś pałę z historii?! - pyta wkurzony ojciec\n- Bo nie chciałem wyjść na konfidenta\n- Jak to?\n- Bo Pani pytała mnie, kto zabił Juliusza Cezara`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 4) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Blondynka idzie do mechanika i mówi:\n- Coś mi cieknie z samochodu\n- To olej - mówi mechanik\n- No dobra, to oleje`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 5) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Jasiu w święta podchodzi do mamy i mówi:\n– Mamusiu, choinka się pali\n– Syneczku, nie mówi się, że się pali, tylko że się świeci\nPo chwili Jasiu wraca i mówi:\n– Mamusiu, a teraz firanka się świeci`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 6) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Co robi król na tronie?\n- Załatwia sprawy :joy:`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 7) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Mówi przedszkolak do przedszkolaka:\n- My modlimy się przed każdym posiłkiem\n- My nie musimy, bo moja mama dobrze gotuje`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 8) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Jak się uśmiecha saper?\n- Rozbrajająco :joy:`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 9) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Co ma łyżka wspólnego z jesienią?\n- Je sie nią`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 10) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Czym różni się ksiądz od policjanta?\n- Ksiądz mówi Pan z wami, a policjant Pan z nami :joy:`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 11) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Dlaczego matematyk potrzebował odpocząć?\n- Bo się przeliczył :joy:`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 12) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Jasiu pyta się mamy:\n- Mamo dlaczego się malujesz?\n- Aby ładnie wyglądać synku\n- A kiedy to zadziała?`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
                if (liczba === 13) {
                    var embed = new Discord.MessageEmbed()
                    embed
                        .setTitle(`Żart!`)
                        .setColor(config.kolor_embeda)
                        .setDescription(`Przychodzi budowlaniec do majstra i mówi:\n- Panie majstrze łopata mi się złamała!\n- To się oprzyj o betoniarkę`)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                    message.channel.send(embed)
                }
            }
        }
        else {
            var liczba = Math.floor(Math.random() * 13) + 1
            if (liczba === 1) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Blondynka pyta brunetkę:\n- Masz chipsy prosto z pieca?\n- Nie, z paczki`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 2) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Dlaczego tost nie strzelił gola?\n- Bo był spalony :joy:`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 3) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Ojciec rozmawia z Jasiem po wywiadówce:\n- Czemu znowu dostałeś pałę z historii?! - pyta wkurzony ojciec\n- Bo nie chciałem wyjść na konfidenta\n- Jak to?\n- Bo Pani pytała mnie, kto zabił Juliusza Cezara`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 4) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Blondynka idzie do mechanika i mówi:\n- Coś mi cieknie z samochodu\n- To olej - mówi mechanik\n- No dobra, to oleje`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 5) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Jasiu w święta podchodzi do mamy i mówi:\n– Mamusiu, choinka się pali\n– Syneczku, nie mówi się, że się pali, tylko że się świeci\nPo chwili Jasiu wraca i mówi:\n– Mamusiu, a teraz firanka się świeci`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 6) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Co robi król na tronie?\n- Załatwia sprawy :joy:`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 7) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Mówi przedszkolak do przedszkolaka:\n- My modlimy się przed każdym posiłkiem\n- My nie musimy, bo moja mama dobrze gotuje`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 8) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Jak się uśmiecha saper?\n- Rozbrajająco :joy:`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 9) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Co ma łyżka wspólnego z jesienią?\n- Je sie nią`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 10) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Czym różni się ksiądz od policjanta?\n- Ksiądz mówi Pan z wami, a policjant Pan z nami :joy:`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 11) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Dlaczego matematyk potrzebował odpocząć?\n- Bo się przeliczył :joy:`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 12) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Jasiu pyta się mamy:\n- Mamo dlaczego się malujesz?\n- Aby ładnie wyglądać synku\n- A kiedy to zadziała?`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
            if (liczba === 13) {
                var embed = new Discord.MessageEmbed()
                embed
                    .setTitle(`Żart!`)
                    .setColor(config.kolor_embeda)
                    .setDescription(`Przychodzi budowlaniec do majstra i mówi:\n- Panie majstrze łopata mi się złamała!\n- To się oprzyj o betoniarkę`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
        }
    }
}