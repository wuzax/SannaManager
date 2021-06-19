const Command = require("../../structures/Command.js"),
Discord = require("discord.js"),
stringSimilarity = require("string-similarity");

class Addrank extends Command {
    constructor (client) {
        super(client, {
            name: "addrank",
            dirname: __dirname,
            enabled: true,
            aliases: [ "ar" ],
            clientPermissions: [ "EMBED_LINKS", "MANAGE_ROLES" ],
            permLevel: 2
        });
    }

    async run (message, args, data) {
        
        let inviteCount = args[0];
        if(!inviteCount) return message.channel.send(message.language.addrank.errors.inviteCount.missing(data.guild.prefix));
        if(isNaN(inviteCount) || parseInt(inviteCount) < 1 || parseInt(inviteCount) > 10000 || !Number.isInteger(parseInt(inviteCount))) return message.channel.send(message.language.addrank.errors.inviteCount.incorrect(data.guild.prefix));
        let currentRank = data.guild.ranks.find((r) => r.inviteCount === inviteCount) || {};
        if(data.guild.ranks.length >= 10) {
            if(!data.guild.premium) {
                return message.channel.send(message.language.premiumJoin.premium(message.author.username));
            } else {
                if(data.guild.ranks.length >= 20) return message.channel.send(message.language.premiumJoin.noRanks)
            }
        }
        let currentRole = message.guild.roles.cache.find((r) => r.id === currentRank.roleID);
        if(currentRank && currentRole) return message.channel.send(message.language.addrank.errors.inviteCount.alreadyExists(data.guild.prefix, currentRank, currentRole));

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args.slice(1).join(" ")) || message.guild.roles.cache.find((role) => role.name === args.slice(1).join(" ") || (stringSimilarity.compareTwoStrings(role.name, args.slice(1).join(" ")) > 0.85));
        if(role.managed === true) return message.channel.send(message.language.addrank.errors.role.missing(data.guild.prefix))
        if(!role) return message.channel.send(message.language.addrank.errors.role.missing(data.guild.prefix));
        if(role.position > message.guild.me.roles.highest.position) return message.channel.send(message.language.addrank.errors.role.perm(role));
        currentRank = data.guild.ranks.find((r) => r.roleID === role.id);
        if(currentRank) return message.channel.send(message.language.addrank.errors.role.alreadyExists(data.guild.prefix, currentRank, role));

        data.guild.ranks.push({ roleID: role.id, inviteCount });
        data.guild.markModified("ranks");
        await data.guild.save();

        let embed = new Discord.MessageEmbed()
        .setAuthor(message.language.addrank.title())
        .setDescription(message.language.addrank.field(data.guild.prefix, role, inviteCount))
        .setColor(data.color)
        .setFooter(data.footer);

        message.channel.send(embed);

    }

};

module.exports = Addrank;