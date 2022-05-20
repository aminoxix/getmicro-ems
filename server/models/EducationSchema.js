const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");

var educationSchema = new mongoose.Schema({
    SchoolUniversity: { type: String, required: true },
    Degree: { type: String, required: true },
    Grade: { type: String, required: true },
    PassingOfYear: { type: String, required: true }
});
educationSchema.plugin(autoIncrement.plugin, {
    model: "Education",
    field: "EducationID"
});

module.exports = mongoose.model("Education", educationSchema);

module.exports.EducationValidation = Joi.object().keys({
    SchoolUniversity: Joi.string()
        .max(200)
        .required(),
    Degree: Joi.string()
        .max(200)
        .required(),
    Grade: Joi.string()
        .max(50)
        .required(),
    PassingOfYear: Joi.string()
        .max(10)
        .required()
});