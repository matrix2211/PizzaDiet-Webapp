const {
    Client,
    Message,
    MessageEmbed,
    Interaction
} = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
    name: 'select',
    aliases: ["selection"],
    description: 'Delete an item from the menu',
    usage: '<mention> <reason>',
    permission: 'SEND_MESSAGES',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('test-subject')
                    .setPlaceholder('Pizzadiet toh hai')
                    // .setDisabled(true)
                    .addOptions([
                        {
                            label: 'first option',
                            value: 'first',
                            description: 'ehhhhh first option',
                            emoji: '1️⃣'
                        },
                        {
                            label: 'second option',
                            value: 'second',
                            description: 'ehhhhh second option',
                            emoji: '2️⃣'
                        },
                        {
                            label: 'third option',
                            value: 'third',
                            description: 'ehhhhh third option',
                            emoji: '3️⃣'
                        }
                    ])
            )

        const embed = new MessageEmbed().setTitle("Choose an option")

        const filter = (interaction) => interaction.isSelectMenu() && interaction.user.id === message.author.id

        const collector = message.channel.createMessageComponentCollector({
            filter, max: '2'
        })

        collector.on('collect', async (collected) => {
            const value = collected.values[0]
            collected.deferUpdate();
            collected.channel.send({ content: value })
        })

        message.channel.send({ embeds: [embed], components: [row] })
    }
}