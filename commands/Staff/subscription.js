const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Subscription extends Command {
    constructor (client) {
        super(client, {
            name: "subscription",
            dirname: __dirname,
            enabled: true,
            aliases: [ "sub", "isp", "isPremium", "ispremium" ],
            clientPermissions: [],
            permLevel: 4
        });
    }

    async run (message, args, data) {
        let id = args[0]
        if(!id) {
            let guild = message.guild
            let embed = new Discord.MessageEmbed()
            .setTitle(`Subscription for ${guild.name}`)
            .addField("ID", guild.id)
            .addField("Premium", data.guild.premium ? "Yes" : "No")
            let color;
            if(data.guild.premium === true) {
                color = "#17B21E"
            } else {
                color = "#CE2626"
            }
            embed.setColor(color)
            message.channel.send(embed)
        }
        if(args[0]) {
            this.client.findOrCreateGuild({id}).then((e) => {
                let guild = this.client.guilds.cache.get(id)
                let embed = new Discord.MessageEmbed()
                .setTitle(`Subscription for ${guild.name}`)
                .addField("ID", guild.id)
                .addField("Premium", e.premium ? "Yes" : "No")
                let color;
                if(e.premium === true) {
                    color = "#17B21E"
                } else {
                    color = "#CE2626"
                }
                embed.setColor(color)
                message.channel.send(embed)
            })
        }
    }
};

module.exports = Subscription;