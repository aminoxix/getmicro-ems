const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");

var workExperienceSchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    Designation: { type: String, required: true },
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true }
});
workExperienceSchema.plugin(autoIncrement.plugin, {
    model: "WorkExperience",
    field: "WorkExperienceID"
});

module.exports = mongoose.model("WorkExperience", workExperienceSchema);

module.exports.WorkExperienceValidation = Joi.object().keys({
    CompanyName: Joi.string()
        .max(200)
        .required(),
    Designation: Joi.string()
        .max(200)
        .required(),
    FromDate: Joi.date().required(),
    ToDate: Joi.date().required()
});