const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const menu = require('../../models/menus');

module.exports = {
    name: 'adddescription',
    aliases: ["ad"],
    description: 'Add description to an item in the menu',
    usage: '<mention> <reason>',
    permission: 'SEND_MESSAGES',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const nameInput = args[0]
        const description = args.slice(0).join(" ")
        if (!nameInput) return message.reply('You need to mention name of the item you want to add the description of.')

        const pizzaSchema = require("../../models/menus")
        const result = await pizzaSchema.findOneAndUpdate( //needs to be required
            { name: nameInput },
            { description: description },
            { upsert: true, new: true, }
        )

        message.reply("Successfully added description to this item.")
    }
}