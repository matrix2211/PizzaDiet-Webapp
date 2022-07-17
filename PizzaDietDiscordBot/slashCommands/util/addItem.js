const {
  Modal,
  TextInputComponent,
  SelectMenuComponent,
  showModal,
} = require("discord-modals"); // Import all

module.exports = {
  name: "additem",
  description: "adds an item to the pizza diet website",
  dmPermission: false,
  options: [],
  run: async (client, interaction, options) => {
    const modal = new Modal() // We create a Modal
      .setCustomId("pizzadd" + interaction.id)
      .setTitle("Adding a new pizzas")
      .addComponents(
        new TextInputComponent() // We create a Text Input Component
          .setCustomId("pizzaName")
          .setLabel("Name")
          .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setPlaceholder("Write the unique pizza name here")
          .setRequired(true), // If it's required or not

        // new TextInputComponent() // We create a Text Input Component
        //   .setCustomId("pizzaDesc")
        //   .setLabel("Name")
        //   .setStyle("Long") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
        //   .setPlaceholder("Write the pizza's description here")
        //   .setRequired(true), // If it's required or not

        new SelectMenuComponent() // We create a Select Menu Component
          .setCustomId("pizzaCategory")
          .setPlaceholder("What is the pizza Category?")
          .addOptions(
            {
              label: "Simply Veg.",
              value: "Simply Veg.",
              emoji: "🍕",
            },
            {
              label: "Classic Veg.",
              value: "Classic Veg.",
              emoji: "🍕",
            },
            {
              label: "Deluxe Veg.",
              value: "Deluxe Veg.",
              emoji: "🍕",
            },
            {
              label: "Jain Special",
              value: "Jain Special",
              emoji: "🍕",
            },
            {
              label: "Supreme Veg.",
              value: "Supreme Veg.",
              emoji: "🍕",
            },
            {
              label: "Mini Pizza",
              value: "Mini Pizza",
              emoji: "🍕",
            },
            {
              label: "Starters",
              value: "Starters",
              emoji: "🍟",
            },
            {
              label: "Pasta",
              value: "Pasta",
              emoji: "🍝",
            },
            {
              label: "none",
              value: "none",
              emoji: "⛔",
            }
          ),
        new TextInputComponent() // We create a Text Input Component
          .setCustomId("pizzaPriceSmall")
          .setLabel("Pizza Price (small)")
          .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setPlaceholder("Write the pizza cost , small size ! (numbers only)")
          .setRequired(true), // If it's required or not,
        new TextInputComponent() // We create a Text Input Component
          .setCustomId("pizzaPriceMedium")
          .setLabel("Pizza Price (medium)")
          .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setPlaceholder("Write the pizza cost , medium size ! (numbers only)")
          .setRequired(true), // If it's required or not,
        new TextInputComponent() // We create a Text Input Component
          .setCustomId("pizzaPriceLarge")
          .setLabel("Pizza Price (large)")
          .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setPlaceholder("Write the pizza cost , large size ! (numbers only)")
          .setRequired(true), // If it's required or not,
        new TextInputComponent() // We create a Text Input Component
          .setCustomId("pizzaPriceLarge")
          .setLabel("Pizza Price (large)")
          .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setPlaceholder("Write the pizza cost , large size ! (numbers only)")
          .setRequired(false) // If it's required or not,
      );
    showModal(modal, {
      client: client, // Client to show the Modal through the Discord API.
      interaction: interaction, // Show the modal with interaction data.
    });
  },
};