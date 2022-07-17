const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [],
    description: 'Shows bot\'s latency.',
    usage: '',
    permission: 'MANAGE_MESSAGES',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms`);
    }
}