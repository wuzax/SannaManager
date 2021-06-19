const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Addpremium extends Command {
    constructor (client) {
        super(client, {
            name: "addpremium",
            dirname: __dirname,
            enabled: true,
            aliases: [ "ap" ],
            clientPermissions: [],
            permLevel: 4
        });
    }

    async run (message, args, data) {
        if(args[0] === "partner") {
            const guildID = args[1]
            if(!guildID) return message.channel.send("Invalid args.")
            if(data.guild.premium === true) return message.channel.send("This server is already premium !");
            if(this.client.guilds.cache.get(guildID)) {
                let guildName = this.client.guilds.cache.get(guildID).name
                data.guild.premium = true;
                await data.guild.save();
                message.channel.send(`The server ${guildName} is now premium !`)
            }
        }
        if(args[0] === "premium") {
            const guildID = args[1]
            if(!guildID) return message.channel.send("Invalid args.")
            if(data.guild.premium === true) return message.channel.send("This server is already premium !");
            if(this.client.guilds.cache.get(guildID)) {
                let guildName = this.client.guilds.cache.get(guildID).name
                data.guild.premium = true;
                await data.guild.save();
                message.channel.send(`The server ${guildName} is now premium !`)
            }
            setTimeout(async function() {
                if(data.guild.premium === false) return;
                if(this.client.guilds.cache.get(guildID)) {
                    data.guild.premium = false;
                    await data.guild.save();
                }
            }, 2629800000)
        }
        if(!args[0]) {
            message.channel.send("No args: arg valide is \"partner\" or \"premium\" !")
        }
    }
};

module.exports = Addpremium;