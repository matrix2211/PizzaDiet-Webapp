const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const menu = require('../../models/menus')

module.exports = {
    name: 'menuitems',
    aliases: ['menu'],
    description: 'Lists menu items',
    usage: ' ',
    permission: 'SEND_MESSAGES',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        // const sizeInput = args[1]

        menu.find({
            // size: "small"
        }, async (err, data) => {
            if (err) throw err
            if (data) {
                const e = data.map(
                    (w, i) => `\n**Name: ${w.name}** \n ${w.size} \n`
                )
                const embed = new MessageEmbed()
                    .setDescription(e.join(' '))
                message.channel.send({
                    embeds: [embed]
                })
            } else {
                message.channel.send('There are no items in the menu')
            }
        })

    }
}