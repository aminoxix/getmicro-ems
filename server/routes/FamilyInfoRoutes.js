const Joi = require("joi");

const {
    verifyHREmployee,
    verifyEmployee
} = require("./middlewares");
const router = require("express").Router();

const Employee = require("../models/EmployeeSchema");

const FamilyInfo = require("../models/FamilyInfoSchema");
const { FamilyInfoValidation } = require("../models/FamilyInfoSchema");

router.get("/:id", verifyHREmployee, (req, res) => {
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "familyInfo"
            // populate: {
            //   path: "state",
            //   model: "State",
            //   populate: {
            //     path: "country",
            //     model: "Country"
            //   }
            // }
        })
        // .select(" -role -position -department")
        .select("FirstName LastName MiddleName")
        .exec(function (err, employee) {
            // console.log(filteredCompany);
            res.send(employee);
        });
});

router.post("/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            Employee.findById(req.params.id, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("err");
                } else {
                    let newFamilyInfo;

                    newFamilyInfo = {
                        Name: req.body.Name,
                        Relationship: req.body.Relationship,
                        DOB: req.body.DOB,
                        Occupation: req.body.Occupation
                    };

                    FamilyInfo.create(newFamilyInfo, function (err, familyInfo) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            employee.familyInfo.push(familyInfo);
                            employee.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    res.send("err");
                                } else {
                                    console.log(data);
                                    res.send(familyInfo);
                                }
                            });
                            console.log("new familyInfo Saved");
                        }
                    });
                    console.log(req.body);
                }
            });
        }
    });
});

router.put("/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newFamilyInfo;

            newFamilyInfo = {
                Name: req.body.Name,
                Relationship: req.body.Relationship,
                DOB: req.body.DOB,
                Occupation: req.body.Occupation
            };

            FamilyInfo.findByIdAndUpdate(req.params.id, newFamilyInfo, function (
                err,
                familyInfo
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newFamilyInfo);
                }
            });
        }
        console.log("put");
        console.log(req.body);
    });
});

router.delete("/:id/:id2", verifyEmployee, (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            FamilyInfo.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                familyInfo
            ) {
                if (!err) {
                    console.log("FamilyInfo deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { familyInfo: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(familyInfo);
                        }
                    );
                } else {
                    console.log(err);
                    res.send("error");
                }
            });
            console.log("delete");
            console.log(req.params.id);
        }
    });
});

module.exports = router;
