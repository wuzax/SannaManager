const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class GetInvite extends Command {
    constructor (client) {
        super(client, {
            name: "getInvite",
            dirname: __dirname,
            enabled: true,
            aliases: [ "gi" ],
            clientPermissions: [],
            permLevel: 4
        });
    }

    async run (message, args, data) {
        let id = args[0]
        if (!id || id.length < 18 || id.length > 18) return message.channel.send("The error has spawned, please try again")

        let guild = this.client.guilds.cache.get(id);
        if(guild) {
            let ch = guild.channels.cache.filter(c => c.type === "text");
            ch.first().createInvite({maxAge: "0", reason: "Command GetInvite (Owner command)"}).then(i => message.channel.send(i.url))
        }
    }
};

module.exports = GetInvite;