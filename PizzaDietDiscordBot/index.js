const {
    Collection,
    Client
} = require('discord.js');



const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ],
    partials: ["CHANNEL"],
});
module.exports = client;
const discordModals = require('discord-modals'); // Define the discord-modals package!
discordModals(client);

// Mongo Connection
const {
    mongooseConnectionString
} = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(mongooseConnectionString, {
    useFindAndModify: true,
    useUnifiedTopology: true,
}).then(console.log('Connected to mongodb!'))

client.commands = new Collection()
client.config = require('./config.json')
client.prefix = client.config.prefix
client.aliases = new Collection()
client.slash_commands = new Collection();


require('./handler/slash_commands');
require('./handler')(client);

//functions


client.login(client.config.token)
process.on("unhandledRejection", (reason, p) => {
    console.log(" [antiCrash] :: Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [antiCrash] :: Multiple Resolves");
     console.log(type, promise, reason);
});




