const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");

var positionSchema = new mongoose.Schema({
    PositionName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
positionSchema.plugin(autoIncrement.plugin, {
    model: "Position",
    field: "PositionID"
});

module.exports = mongoose.model("Position", positionSchema);

module.exports.PositionValidation = Joi.object().keys({
    PositionName: Joi.string()
        .max(200)
        .required(),
    CompanyID: Joi.required()
});
