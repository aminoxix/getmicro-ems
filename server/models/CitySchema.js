const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");

var citySchema = new mongoose.Schema({
    CityName: { type: String, required: true },
    state: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
});
citySchema.plugin(autoIncrement.plugin, {
    model: "City",
    field: "CityID"
});

module.exports = mongoose.model("City", citySchema);
module.exports.citySchema = citySchema;
module.exports.CityValidation = Joi.object().keys({
    _id: Joi.optional(),
    StateID: Joi.optional(),
    CityName: Joi.string()
        .max(200)
        .required()
});