const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class BotInfos extends Command {
    constructor (client) {
        super(client, {
            name: "device",
            dirname: __dirname,
            enabled: true,
            aliases: [ "device" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 0
        });
    }

    async run (message, args, data) {
        let user = message.mentions.users.first() || await this.client.resolveUser(args[0]) || message.author;
        let member = await message.guild.members.fetch(user.id).catch(() => {});
        let activity;
        switch (member.presence.status) {
            case "online":
                activity = `${this.client.emoji.online} Online`
                break;
            case "offline":
                activity = `${this.client.emoji.offline} Offline`
                break;
            case "idle":
                activity = `${this.client.emoji.idle} Idle`
                break;
            case "dnd":
                activity = `${this.client.emoji.dnd} Dnd`
        }
        let s = member.presence.clientStatus;
        let device = [];
        
        if(s.desktop) device.push("🖥️ Ordinateur")
        if(s.web)  device.push("🌐 Navigateur")
        if(s.mobile)  device.push("📱 Mobile")
        if(!device.length) device.push('Actuellement déconnecté.')
        let embed = new Discord.MessageEmbed()
        .setTitle(`Appareil connecté sur le compte ${member.user.username}`)
        .addField("Status", activity)
        .addField("Connection", device.join("\n"))
        .setColor("#FAFAFA")
        message.channel.send(embed)
    }
};

module.exports = BotInfos;