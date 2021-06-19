const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Reboot extends Command {

    constructor (client) {
        super(client, {
            name: "reboot",
            dirname: __dirname,
            enabled: true,
            aliases: [ "rb" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 5
        });
    }

    async run (message, args, data) {

        message.channel.send("Restarting soon...")
        .then(() => process.exit()).catch((err) => console.error(err))
    }
}

module.exports = Reboot;