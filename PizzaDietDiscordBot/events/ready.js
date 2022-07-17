const client = require('../index')
client.on('ready', async (message) => {
    console.log(`${client.user.tag} is now online!`)
    setInterval(() => {
                client.user.setActivity("Owner ki beti", {type: "LISTENING"})
    }, 5000);
    
})