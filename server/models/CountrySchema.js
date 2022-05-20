const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");

var countrySchema = new mongoose.Schema({
    CountryName: { type: String, required: true },
    states: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
});
countrySchema.plugin(autoIncrement.plugin, {
    model: "Country",
    field: "CountryID"
});

module.exports = mongoose.model("Country", countrySchema);

module.exports.CountryValidation = Joi.object().keys({
    _id: Joi.optional(),
    CountryID: Joi.optional(),
    CountryName: Joi.string()
        .max(200)
        .required()
});
