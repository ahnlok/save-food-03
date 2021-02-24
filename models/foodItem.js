const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodItemSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
    expiration: {
        type: String,
        trim: true,
    },
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;


