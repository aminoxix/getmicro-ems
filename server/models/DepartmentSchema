const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");

var departmentSchema = new mongoose.Schema({
    DepartmentName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
departmentSchema.plugin(autoIncrement.plugin, {
    model: "Department",
    field: "DepartmentID"
});

module.exports = mongoose.model("Department", departmentSchema);

module.exports.DepartmentValidation = Joi.object().keys({
    DepartmentName: Joi.string()
        .max(200)
        .required(),
    CompanyID: Joi.required()
});