const client = require('../index')
const { Client, Message, MessageEmbed, Collection } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms')

client.on("messageCreate", async (message) => {
    try {
        if (message.author.bot || !message.guild) return
        if (!message.content.startsWith(client.prefix)) return;
        const [cmd, ...args] = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(" ");
        const Discord = require('discord.js')
        let command = client.commands.get(cmd)
        if (!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) {
            if (command.permission && message.member.permissions.has(command.permission)) {
                if (command.cooldown) {
                    if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send({
                        embeds: [new MessageEmbed()
                            .setDescription(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` cooldown.`)
                            .setColor('#36393E')]
                    })
                    command.run(client, message, args)
                    Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                    setTimeout(() => {
                        Timeout.delete(`${command.name}${message.author.id}`)
                    }, command.cooldown)
                } else await command.run(client, message, args, Discord);
            } else {
                message.reply('You don\'t have the required permissions to use this command!')
            }
        }
    } catch (err) {
        console.log(err)
        message.reply(`An error occured while executing this command.`)
    }
})