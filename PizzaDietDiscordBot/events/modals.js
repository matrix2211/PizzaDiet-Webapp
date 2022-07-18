const client = require("../index");
const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
} = require("discord.js");



client.on("modalSubmit", async (modal) => {
    if (modal.customId.startsWith("pizzadd")) {
        const nameResponse = modal.getTextInputValue("pizzaName");
        //   const descResponse = modal.getTextInputValue('pizzaDesc');
        const categoryResponse = modal.getSelectMenuValues("pizzaCategory");
        const priceSmallResponse = modal.getTextInputValue("pizzaPriceSmall");
        const priceMediumResponse = modal.getTextInputValue("pizzaPriceMedium");
        const priceLargeResponse = modal.getTextInputValue("pizzaPriceLarge");

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("accept")
                .setLabel("Continue")
                .setStyle("SUCCESS")
        );
        await modal.reply({ content: `Click continue after uploading the image.` });
        channel = await client.channels.fetch(modal.channelId);
        message1 = await channel.send({ content: "** **", components: [row] });
        filter = (interaction) => interaction.user.id === modal.user.id;
        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 120000,
        });
        imagelink = "";
        await collector.on("end", async (ButtonInteraction, reason) => {
            if (reason == "time") {
                message1.edit({ content: "TIMEOUT", components: [] });
            } else if (reason == "limit") {
                message1.edit({
                    content: "Searching for your image...",
                    components: [],
                });
                msgs = await channel.messages.fetch({ after: message1.id });
                msgs.forEach((msg) => {
                    if (
                        msg.author.id === ButtonInteraction.first().user.id &&
                        msg.attachments.first()
                    ) {
                        imagelink = msg.attachments.first().url;
                    }
                });
                if (imagelink == "") {
                    message1.edit("Image not found");
                    return;
                }

                const download = require("../utility/downloader");
                download(
                    imagelink,
                    "./img/" + categoryResponse + "-" + nameResponse + ".png",
                    function () {
                    }
                );
                download(
                    imagelink,
                    "../public/img/" + categoryResponse + "-" + nameResponse + ".png",
                    function () {
                    }
                );
                if (
                    isNaN(priceSmallResponse) &&
                    isNaN(priceMediumResponse) &&
                    isNaN(priceLargeResponse)
                ) {
                    message1.reply(
                        `<@${modal.user.id}> Invalid prices were entered please retry.`
                    );
                }
                let size = { small: priceSmallResponse, medium: priceMediumResponse, large: priceLargeResponse }
                const pizzaSchema = require("../models/menus")
                const result = await pizzaSchema.findOneAndUpdate( //needs to be required
                    { name: nameResponse, category: categoryResponse.toString() },
                    { name: nameResponse, category: categoryResponse.toString(), image: categoryResponse + "-" + nameResponse + ".png", size },
                    { upsert: true, new: true, }
                )
                message1.reply(`<@${modal.user.id}>\`${JSON.stringify(result)}\``)
            }
        });
    }
});