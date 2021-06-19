const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Database extends Command {
    constructor (client) {
        super(client, {
            name: "database",
            dirname: __dirname,
            enabled: true,
            aliases: [ "db" ],
            clientPermissions: [],
            permLevel: 5
        });
    }

    async run (message, args, data) {
        console.log(true)
        // let id = args[0] ? args[0] : message.guild.id
        let id;
        if(args[0]) {
            id = args[0]
        } else {
            id = message.guild.id
        }
        this.client.findOrCreateGuild().then((data) => {
            data.guild = data
            let guild = this.client.guilds.cache.get(id)
            let join;
            if(data.guild.join.enabled === true) {
                join = this.client.emoji.success + "Message d'arrivés"
            } else {
                join = this.client.emoji.error + "Message d'arrivés"
            }
            let joinDM;
            if(data.guild.joinDM.enabled === true) {
                joinDM = this.client.emoji.success + "Message d'arrivés en MP"
            } else {
                joinDM = this.client.emoji.error + "Message d'arrivés en MP"
            }
            let leave;
            if(data.guild.leave.enabled === true) {
                leave = this.client.emoji.success + "Message d'arrivés en MP"
            } else {
                leave = this.client.emoji.error + "Message d'arrivés en MP"
            }
            let embed = new Discord.MessageEmbed()
            .setTitle(`:robot: Information sur la base de donné du serveur **${guild.name}**`)
            .setColor(data.color)
            .addField("Information de base", `
            > ID: ${guild.id}
            > Prefix: ${data.guild.prefix}
            > Langue: ${data.guild.language}`)
            .addField(join, `
            > Activés: ${data.guild.join.enabled ? "**oui**" : "**non**"}
            > Message: ${data.guild.join.message ? "**défini**" : "**non défini**."}
            > Salon: ${!data.guild.join.channel ? "**non défini**" : (guild.channels.cache.get(data.guild.join.channel) ? "**défini**" : "**salon introuvable**")}`, true)
            .addField(leave, `
            > Activés: ${data.guild.leave.enabled ? "**oui**" : "**non**"}
            > Message: ${data.guild.leave.message ? "**défini**" : "**non défini**."}
            > Salon: ${!data.guild.leave.channel ? "**non défini**" : (guild.channels.cache.get(data.guild.leave.channel) ? "**défini**" : "**salon introuvable**")}`, true)
            .addField(joinDM, `
            > Activés: ${data.guild.joinDM.enabled ? "**oui**" : "**non**"}
            > Message: ${data.guild.joinDM.message ? "**défini**" : "**non défini**."}
            > Salon: ${!data.guild.joinDM.channel ? "**non défini**" : (guild.channels.cache.get(data.guild.joinDM.channel) ? "**défini**" : "**salon introuvable**")}`, true)
            .setFooter(data.footer)
            message.channel.send(embed)
        })
    }
};

module.exports = Database;