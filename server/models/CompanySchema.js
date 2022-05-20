const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");
const { citySchema } = require('./CitySchema');

var companySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    Address: { type: String, required: true },
    PostalCode: { type: Number, required: true },
    Website: { type: String, required: true },
    Email: { type: String, required: true },
    ContactPerson: { type: String, required: true },
    ContactNo: { type: String, required: true },
    FaxNo: { type: String, required: true },
    PanNo: { type: String, required: true },
    GSTNo: { type: String, required: true },
    CINNo: { type: String, required: true },
    Deleted: { type: Boolean },
    city: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }]
});
citySchema.plugin(autoIncrement.plugin, {
    model: "Company",
    field: "CompanyID"
});

module.exports.CompanyValidation = Joi.object().keys({
    _id: Joi.optional(),
    CityID: Joi.optional(),
    CompanyName: Joi.string()
        .max(200)
        .required(),
    Address: Joi.string()
        .max(2000)
        .required(),
    PostalCode: Joi.number()
        .max(999999)
        .required(),
    Website: Joi.string()
        .max(2000)
        .required(),
    Email: Joi.string()
        .max(1000)
        .required(),
    ContactPerson: Joi.string()
        .max(200)
        .required(),
    ContactNo: Joi.string()
        .max(20)
        .required(),
    FaxNo: Joi.string()
        .max(100)
        .required(),
    PanNo: Joi.string()
        .max(200)
        .required(),
    GSTNo: Joi.string()
        .max(200)
        .required(),
    CINNo: Joi.string()
        .max(200)
        .required(),
    Deleted: Joi.optional()
});

module.exports = mongoose.model("Company", companySchema);