const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    category: { type: String, default: "none", enum: ["Simply Veg.", "Classic Veg.", "Deluxe Veg.", "Jain Special", "Supreme Veg.", "Mini Pizza", "Starters", "Pasta", "none"]},
    name: { type: String, required: true },
    image: { type: String, required: true, default: 'pizza.png' },
    size: {
        small: { type: Number },
        medium: { type: Number },
        large: { type: Number }
    },
})

module.exports = mongoose.model('menus', menuSchema)
