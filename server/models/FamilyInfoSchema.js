const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");

var familyInfoSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Relationship: { type: String, required: true },
    DOB: { type: Date, required: true },
    Occupation: { type: String, required: true }
});
familyInfoSchema.plugin(autoIncrement.plugin, {
    model: "FamilyInfo",
    field: "FamilyInfoID"
});

module.exports = mongoose.model("FamilyInfo", familyInfoSchema);

module.exports.FamilyInfoValidation = Joi.object().keys({
    Name: Joi.string()
        .max(200)
        .required(),
    Relationship: Joi.string()
        .max(200)
        .required(),
    DOB: Joi.date().required(),
    Occupation: Joi.string()
        .max(100)
        .required()
});