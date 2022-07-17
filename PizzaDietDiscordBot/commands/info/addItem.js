const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const menu = require('../../models/menus');

module.exports = {
    name: 'additem',
    aliases: ["ai"],
    description: 'Add an item to the menu',
    usage: '<mention> <reason>',
    permission: 'SEND_MESSAGES',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const nameInput = args[0]
        const priceInputSmall = args[1]
        const priceInputMedium = args[2]
        const priceInputLarge = args[3]

        if (!nameInput || !priceInputSmall || !priceInputMedium || !priceInputLarge) return message.reply('You need to mention name, size and price of all three sizes')

        const msg = await message.channel.send("Select the category")
            .then(async function (message) {
                message.react("1️⃣")
                message.react("2️⃣")

            }).catch(function () {
                //Something
            });


        menu.findOne({
            // guild: message.guild.id,
            // user: user.user.id
        }, async (err, data) => {
            if (err) throw err;
            data = new menu({
                name: nameInput,
                size: {
                    small: priceInputSmall,
                    medium: priceInputMedium,
                    large: priceInputLarge
                },
            })
            data.save()
        })

        message.reply("Successfully added this item to the menu")
    }
}