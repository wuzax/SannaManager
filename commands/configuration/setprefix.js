const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class SetPrefix extends Command {
    constructor (client) {
        super(client, {
            name: "setprefix",
            dirname: __dirname,
            enabled: true,
            aliases: [ "configprefix" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 2
        });
    }

    async run (message, args, data) {
        let prefix = args[0];
        if(!prefix) return message.channel.send(message.language.setprefix.missing());
        data.guild.prefix = prefix;
        await data.guild.save();
        message.channel.send(message.language.setprefix.success());
    }
};
  

module.exports = SetPrefix;