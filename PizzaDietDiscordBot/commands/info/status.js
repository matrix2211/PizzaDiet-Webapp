const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
const { connection } = require("mongoose");

module.exports = {
    name: "status",
    aliases: [],
    description: 'Bot\'s status',
    usage: '',
    permission: 'MANAGE_NICKNAMES',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        // await message.guilds.cache.get("973889300129259520").members.fetch()
        const Response = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(
                `   **Bot Status**
    \n **Client**: \`🟢 Online!\`
    \n **Database**: \`${switchTo(connection.readyState)}\`
    \n **Client Ping**: \`${client.ws.ping}ms\`
    \n **Message Ping**: \` ${Date.now() - message.createdTimestamp}ms \`
    \n **Uptime**: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`)
            .setFooter(`${client.guilds.cache.size} servers, ${client.channels.cache.size} channels, ${client.users.cache.size} users`)

        message.channel.send({ embeds: [Response] });
    },
};

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0: status = `🔴 Disconnected!`
            break;
        case 1: status = `🟢 Connceted!`
            break;
        case 2: status = `🟠 Connecting!`
            break;
        case 3: status = `🟠 Disconnecting!`
            break;
    }
    return status;
}