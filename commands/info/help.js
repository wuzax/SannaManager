const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            dirname: __dirname,
            enabled: true,
            aliases: [ "h", "aide" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 0
        });
    }

    async run (message, args, data) {
        if(args[0]) {
            const cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
            if(!cmd) {
                return message.channel.send({embed: {
                    description: `Pas de commande trouvé pour ${args[0]}`,
                    color: "#CE2626"
                }})
            }

            let cmdS;
            if(cmd.conf.enabled === true) {
                cmdS = `${this.client.emoji.online} ${cmd.help.name}`
            } else {
                cmdS = `${this.client.emoji.dnd} ${cmd.help.name}`
            }
            let embed = new Discord.MessageEmbed()
            .setTitle(cmdS)
            .addField("Category", "`"+cmd.help.category+"`")
            if(cmd.conf.aliases > 0) {
                embed.addField("Aliases", cmd.help.aliases.map((a) => "`" + a + "`").join(", "))
            }
            embed.addField("Status", cmd.conf.enabled ? `${this.client.emoji.online} ${message.language.errors.activate}` : `${this.client.emoji.dnd} ${message.language.errors.desactivate}`)
            if(cmd.conf.clientPermissions > 0) {
                embed.addField("Client Permissions", cmd.conf.clientPermissions.map((p) => "`" + p + "`").join(", "))
            }
            const permLevel = this.client.getLevel(message);
            let uperm;
            if(permLevel > cmd.conf.permLevel) {
                uperm = `${this.client.emoji.online} ${message.language.errors.uHasPerm}`
            } else {
                uperm = `${this.client.emoji.dnd} ${message.language.errors.uNotPerm}`
            }
            embed.addField("User Permission", uperm)
            embed.setFooter(data.footer)
            embed.setColor(data.color)
            message.channel.send(embed)
        } else {
            const categories = [];
            const commands = this.client.commands;

            commands.forEach((command) => {
                if(!categories.includes(command.help.category)) {
                    const permLevel = this.client.getLevel(message);
                    if(command.help.category === "owner" && command.conf.permLevel > permLevel){
                        return;
                    }
                    if(command.help.category === "Staff" && command.conf.permLevel > permLevel){
                        return;
                    }
                    categories.push(command.help.category);
                }
            });

            const embed = new Discord.MessageEmbed()
            .setDescription(message.language.help.description(message.guild.name, data.guild.prefix))
            .setColor(data.color)
            categories.sort().forEach((cat) => {
                const c = commands.filter((cmd) => cmd.help.category === cat);
                embed.addField(cat + " - (" + c.size + ")", c.map((cmd) => "`"+cmd.help.name+"`").join(", "));
            })
            embed.addField(message.language.help.tip(data.guild.prefix),"\n\n"+message.language.help.links(this.client.user.id));
            embed.setThumbnail(message.author.displayAvatarURL())
            message.channel.send(embed)
        }
    }
}

module.exports = Help;