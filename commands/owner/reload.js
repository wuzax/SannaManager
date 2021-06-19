const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Reload extends Command {

    constructor (client) {
        super(client, {
            name: "reload",
            dirname: __dirname,
            enabled: true,
            aliases: [ "r", "rl" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 5
        });
    }

    async run (message, args, data) {
        let command = args[0];
        if(!command) return message.channel.send(this.client.config.emojis.error+" | Cannot find argument!");
        if(command === "l"){
            delete require.cache[require.resolve("../../languages/english.js")];
            delete require.cache[require.resolve("../../languages/french.js")];
            return message.channel.send(this.client.config.emojis.success+" | Languages reloaded!");
        }
        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if(!cmd){
            message.channel.send(this.client.config.emojis.error+" | Cannot find command `"+command+"`!");
        }
        await this.client.unloadCommand(cmd.conf.location, cmd.help.name);
        await this.client.loadCommand(cmd.conf.location, cmd.help.name);
        message.channel.send(this.client.config.emojis.success+" | `"+command+"` reloaded!");
    }

}

module.exports = Reload;