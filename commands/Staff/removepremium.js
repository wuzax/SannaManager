const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Removepremium extends Command {
    constructor (client) {
        super(client, {
            name: "removepremium",
            dirname: __dirname,
            enabled: true,
            aliases: [ "rp", "delpremium", "dpremium", "dp" ],
            clientPermissions: [],
            permLevel: 4
        });
    }

    async run (message, args, data) {
        const guildID = args[0]
        if(!guildID) return message.channel.send("Invalid args.")
        if(data.guild.premium === false) return message.channel.send("This server is not premium !");
        if(this.client.guilds.cache.get(guildID)) {
            let guildName = this.client.guilds.cache.get(guildID).name
            data.guild.premium = false;
            await data.guild.save();
            message.channel.send(`The server ${guildName} is now not premium !`)
        }
    }
};

module.exports = Removepremium;