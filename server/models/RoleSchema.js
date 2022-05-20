const mongoose = require('mongoose');
const Joi = require('joi');
const autoIncrement = require("mongoose-auto-increment");

var roleSchema = new mongoose.Schema({
    // RoleID: {type:Number,required:true, default: 0 },
    RoleName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
roleSchema.plugin(autoIncrement.plugin, {
    model: "Role",
    field: "RoleID"
});

module.exports = mongoose.model("Role", roleSchema);

module.exports.RoleValidation = Joi.object().keys({
    RoleName: Joi.string()
        .max(200)
        .required(),
    CompanyID: Joi.required()
});
