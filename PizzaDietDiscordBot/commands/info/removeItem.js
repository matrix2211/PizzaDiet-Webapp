const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const menu = require('../../models/menus');

module.exports = {
    name: 'deleteitem',
    aliases: ["di", 'removeitem', 'ri'],
    description: 'Delete an item from the menu',
    usage: '<mention> <reason>',
    permission: 'SEND_MESSAGES',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const nameInput = args[0]

        if (!nameInput) return message.reply('You need to mention the name of the item you want to delete')

        menu.deleteOne({
            name: nameInput
        }, async (err, data) => {
            if (err) throw err;
        })

        message.reply("Successfully removed this item from the menu")
    }
}