const { parseZone } = require("moment");
const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Status extends Command {
    constructor (client) {
        super(client, {
            name: "status",
            dirname: __dirname,
            enabled: true,
            aliases: [ "s" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 0
        });
    }

    async run (message, args, data) {
        let user = message.mentions.users.first() || await this.client.resolveUser(args[0]) || message.author;
        let member = await message.guild.members.fetch(user.id).catch(() => {});
        if(!member.presence.activities.length) return message.channel.send("**:x: | Pas de status**")
        if(member.presence.activities[1]) {
            let presence = member.presence.activities[1]
            let embed = new Discord.MessageEmbed()
            if(presence.name === "Visual Studio Code") {
                embed.setTitle(`<:vscode:799974487633428500> ${presence.name}`)
                embed.addField("File", presence.details, true)
                embed.addField("Workspace", presence.state, true)
                embed.setColor("#125EDC")
            } else if(presence.name !== "Custom Status") {
                embed.setTitle(presence.name)
                embed.addField("Type", presence.type, true)
                embed.addField("Detail", presence.details)
                embed.addField("Info", presence.state)
                embed.setColor("#FAFAFA")
                if(presence.emoji !== null) {
                    embed.setThumbnail(presence.emoji)
                }
            }
            if(presence.name === "Custom Status") {
                embed.setTitle("Custom Status")
                embed.setDescription(presence.state)
                embed.setColor("#FAFAFA")
            }
            message.channel.send(embed)
        } else {
            let presence = member.presence.activities[0]
            let embed1 = new Discord.MessageEmbed()
            if(presence.name === "Visual Studio Code") {
                embed1.setTitle(`<:vscode:799974487633428500> ${presence.name}`)
                embed1.addField("File", presence.details, true)
                embed1.addField("Workspace", presence.state, true)
                embed1.setColor("#125EDC")
            } else if(presence.name !== "Custom Status") {
                embed1.setTitle(presence.name)
                embed1.addField("Type", presence.type, true)
                embed1.addField("Detail", presence.details)
                embed1.addField("Info", presence.state)
                embed1.setColor("#FAFAFA")
                if(presence.emoji !== null) {
                    embed1.setThumbnail(presence.emoji)
                }
            }
            if(presence.name === "Custom Status") {
                embed1.setTitle("Custom Status")
                embed1.setDescription(presence.state)
                embed1.setColor("#FAFAFA")
            }
            message.channel.send(embed1)
        }
    }

};

module.exports = Status;