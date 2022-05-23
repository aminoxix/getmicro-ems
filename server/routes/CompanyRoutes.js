const Joi = require("joi");

const {
    verifyHR,
    verifyAdminHR
} = require("./middlewares");
const router = require("express").Router();

const Company = require("../models/CompanySchema");
const { CompanyValidation } = require("../models/CompanySchema");

router.get("/", verifyAdminHR, (req, res) => {
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Company.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "city",
            populate: {
                path: "state",
                model: "State",
                populate: {
                    path: "country",
                    model: "Country"
                }
            }
        })
        .exec(function (err, company) {
            res.send(company);
        });
});

router.post("/", verifyAdminHR, (req, res) => {
    Joi.validate(req.body, CompanyValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newCompany;

            newCompany = {
                CompanyName: req.body.CompanyName,
                Address: req.body.Address,
                city: req.body.CityID,
                PostalCode: req.body.PostalCode,
                Website: req.body.Website,
                Email: req.body.Email,
                ContactPerson: req.body.ContactPerson,
                ContactNo: req.body.ContactNo,
                FaxNo: req.body.FaxNo,
                PanNo: req.body.PanNo,
                GSTNo: req.body.GSTNo,
                CINNo: req.body.CINNo
            };

            Company.create(newCompany, function (err, company) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(company);
                    console.log("new company Saved");
                }
            });
            console.log(req.body);
        }
    });
});

router.put("/:id", verifyAdminHR, (req, res) => {
    Joi.validate(req.body, CompanyValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newCompany;

            newCompany = {
                CompanyName: req.body.CompanyName,
                Address: req.body.Address,
                city: req.body.CityID,
                PostalCode: req.body.PostalCode,
                Website: req.body.Website,
                Email: req.body.Email,
                ContactPerson: req.body.ContactPerson,
                ContactNo: req.body.ContactNo,
                FaxNo: req.body.FaxNo,
                PanNo: req.body.PanNo,
                GSTNo: req.body.GSTNo,
                CINNo: req.body.CINNo
            };

            Company.findByIdAndUpdate(req.params.id, newCompany, function (
                err,
                company
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newCompany);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/:id", verifyAdminHR, (req, res) => {
    Company.findByIdAndRemove({ _id: req.params.id }, function (err, company) {
        if (!err) {
            console.log(" company deleted");
            res.send(company);
        } else {
            console.log(err);
            res.send("error");
        }
    });
    console.log("delete");
    console.log(req.params.id);
});

module.exports = router;
