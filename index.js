var Discord = require(`discord.js`)
var config = require(`./config.json`)
var client = new Discord.Client({ ws: { properties: { $browser: `Discord iOS` } } })
require(`events`).EventEmitter.defaultMaxListeners = Infinity;
var package = require(`./package.json`)
var fs = require(`fs`)
var path = require(`path`)
var os = require('os')
var axios = require(`axios`)

client.on(`ready`, async () => {
    console.log(`🤖 | Bot wystartował!`)
    console.log(`🤖 | Tag: ${client.user.tag}`)
    console.log(`🤖 | Prefix: ${config.prefix}`)
    console.log(`🤖 | Kolor embeda: ${config.kolor_embeda}`)
    console.log(`🤖 | Kolor embeda błędu: ${config.kolor_embeda_bledu}`)
    console.log(`🤖 | Serwery: ${client.guilds.cache.size}`)
    console.log(`🤖 | Status: W grze niesamowitybot.pl (${client.guilds.cache.size})`)

    var baseFile = `command-base.js`
    var commandBase = require(`./commands/${baseFile}`)

    var readCommands = (dir) => {
        var files = fs.readdirSync(path.join(__dirname, dir))
        for (var file of files) {
            var stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                var option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    setInterval(function () {
        client.user.setPresence({ activity: { type: `PLAYING`, name: `niesamowitybot.com.pl (${client.guilds.cache.size})` } })
        var serwerdev = client.guilds.cache.get(`767092790903177237`)
        var serwerpsc = client.guilds.cache.get(`826350653563207761`)
        var kanal1 = serwerdev.channels.cache.get(`814064059439120454`)
        var kanal2 = serwerdev.channels.cache.get(`814064061624090654`)
        var kanal3 = serwerdev.channels.cache.get(`825737024521633792`)
        var kanal4 = serwerpsc.channels.cache.get(`826362575411347517`)
        kanal1.setName(`👦・Tyle nas jest: ${serwerdev.members.cache.filter(member => !member.user.bot).size}`)
        kanal2.setName(`💾・Serwery: ${client.guilds.cache.size}`)
        var embed = new Discord.MessageEmbed()
        embed
            .setTitle(`Status bota i strony`)
            .setColor(config.kolor_embeda)
            .setDescription(`**${emotki.logobota} | Bot**\n・Bot:\n └ Status: Online ${emotki.tak}\n・Baza danych:\n └ Status: Online ${emotki.tak}\n\n**:globe_with_meridians: | Strona**\n・Główna:\n └ Status: Offline ${emotki.nie}\n・Panel:\n └ Status: Offline ${emotki.nie}`)
            .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
            .setFooter(`${client.user.tag} (${client.user.id})`, client.user.displayAvatarURL({ dynamic: true }))
        kanal3.messages.fetch(`825742076972761118`).then((wiadomosc1) => wiadomosc1.edit(embed))
        kanal4.setName(`🎓 ┆ użytkownicy: ${serwerpsc.members.cache.filter(member => !member.user.bot).size}`)
    }, 5600)

    readCommands(`commands`)
})

client.on(`guildMemberAdd`, async member => {
    var kanal = member.guild.channels.cache.find(ch => ch.id === `814064060558737408`)
    var embed = new Discord.MessageEmbed()
    if (!kanal) return;
    embed
        .setTitle(`Witamy!`)
        .setColor(config.kolor_embeda)
        .setDescription(`Witaj ${member.user} na **NiesamowityBOT Dev**! Nie zapomnij zaakceptować regulaminu! Baw się dobrze!`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL({ dynamic: true }))
    kanal.send(embed)
})

client.on(`guildMemberRemove`, async member => {
    var kanal = member.guild.channels.cache.find(ch => ch.id === `814064060558737408`)
    var embed = new Discord.MessageEmbed()
    if (!kanal) return;
    embed
        .setTitle(`Żegnamy!`)
        .setColor(config.kolor_embeda)
        .setDescription(`Żegnamy ${member.user}! Mamy nadzieję, że kiedyś do nas wrócisz...`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL({ dynamic: true }))
    kanal.send(embed)
})

client.on(`guildCreate`, async guild => {
    var kanal = guild.channels.cache.find(channel => channel.type === 'text')
    var embed = new Discord.MessageEmbed()
    embed
        .setTitle(`Witaj!`)
        .setColor(config.kolor_embeda)
        .setDescription(`**Hejka! Jestem NiesamowityBOT, wielofunkcyjnym botem zweryfikowanym przez discorda! Zaufało mi aż ${client.guilds.cache.size} serwerów! Dzięki, że dodałeś mnie na serwer! Komendy znajdziesz po wpisaniu __${config.prefix}pomoc__! To tyle miłego użytkowania!**`)
        .setFooter(`${client.user.tag} (${client.user.id})`, client.user.displayAvatarURL({ dynamic: true }))
    kanal.send(embed)
})

client.on(`message`, message => {
    if (message.content.startsWith(`<@!813144017839325214>`) || message.content.startsWith(`<@813144017839325214>`)) {
        var dbmembersfiles = fs.readdirSync(`db/members`).join(`, `).replace(/\.json/gi, ``)
        if (dbmembersfiles.includes(message.author.id)) {
            var dbmembers = require(`./db/members/${message.author.id}.json`)
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
                var totalSeconds = (client.uptime / 1000);
                var days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
                var hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = Math.floor(totalSeconds % 60);
                var botuptime = (days > 0 ? days + "d, " : "") + (hours > 0 ? hours + "h, " : "") + (minutes > 0 ? minutes + "m, " : "") + (seconds > 0 ? seconds + "s" : "")
                var embed = new Discord.MessageEmbed()
                embed
                    .setColor(config.kolor_embeda)
                    .setDescription(`**Hejka! Jestem NiesamowityBOT, wielofunkcyjnym botem zweryfikowanym przez discorda! Zaufało mi aż ${client.guilds.cache.size} serwerów! Komendy znajdziesz po wpisaniu __${config.prefix}pomoc__! Będziemy się świetnie bawić!**\n\n> ${emotki.korona}  Moim właścicielem jest **<@535375983411462154> (Patryczekk TV#4266)**\n\n> :mega: Odpisałem na swoje [@wspomnienie](https://niesamowitybot.com.pl) w ciągu ${client.ws.ping}ms\n\n> ${emotki.uptime} Mój uptime to **${botuptime}**\n\n> :diamond_shape_with_a_dot_inside: Shard: **[\`1\`/\`1\`]**\n\n> :link: Linki: **[Zaproszenie bota](https://niesamowitybot.com.pl/zapros) | [niesamowitybot.pl](https://niesamowitybot.com.pl) | [Serwer bota](https://niesamowitybot.com.pl/dc) | [Donate na opłatę maszyny](https://niesamowitybot.com.pl/wesprzyj)**\n\nZostań jednym z użytkowników **NiesamowitegoBOTA**, **dodaj go** już **dziś**!`)
                    .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
                message.channel.send(embed)
            }
        }
        else {
            var totalSeconds = (client.uptime / 1000);
            var days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            var hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            var minutes = Math.floor(totalSeconds / 60);
            var seconds = Math.floor(totalSeconds % 60);
            var botuptime = (days > 0 ? days + "d, " : "") + (hours > 0 ? hours + "h, " : "") + (minutes > 0 ? minutes + "m, " : "") + (seconds > 0 ? seconds + "s" : "")
            var embed = new Discord.MessageEmbed()
            embed
                .setColor(config.kolor_embeda)
                .setDescription(`**Hejka! Jestem NiesamowityBOT, wielofunkcyjnym botem zweryfikowanym przez discorda! Zaufało mi aż ${client.guilds.cache.size} serwerów! Komendy znajdziesz po wpisaniu __${config.prefix}pomoc__! Będziemy się świetnie bawić!**\n\n> ${emotki.korona}  Moim właścicielem jest **<@535375983411462154> (Patryczekk TV#4266)**\n\n> :mega: Odpisałem na swoje [@wspomnienie](https://niesamowitybot.com.pl) w ciągu ${client.ws.ping}ms\n\n> ${emotki.uptime} Mój uptime to **${botuptime}**\n\n> :diamond_shape_with_a_dot_inside: Shard: **[\`1\`/\`1\`]**\n\n> :link: Linki: **[Zaproszenie bota](https://niesamowitybot.com.pl/zapros) | [niesamowitybot.pl](https://niesamowitybot.com.pl) | [Serwer bota](https://niesamowitybot.com.pl/dc) | [Donate na opłatę maszyny](https://niesamowitybot.com.pl/wesprzyj)**\n\nZostań jednym z użytkowników **NiesamowitegoBOTA**, **dodaj go** już **dziś**!`)
                .setAuthor(`NiesamowityBOT`, `https://niesamowitybot.com.pl/img/Logo.png`)
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        }
    }
})

client.login(config.token)