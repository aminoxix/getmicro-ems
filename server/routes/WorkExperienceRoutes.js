const Joi = require("joi");

const {
    verifyHREmployee,
    verifyEmployee
} = require("./middlewares");
const router = require("express").Router();

const Employee = require("../models/EmployeeSchema");

const WorkExperience = require("../models/WorkExperienceSchema");
const { WorkExperienceValidation } = require("../models/WorkExperienceSchema");

router.get("/:id", verifyHREmployee, (req, res) => {
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "workExperience"
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
            res.send(employee);
        });
});

router.post("/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            Employee.findById(req.params.id, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("err");
                } else {
                    let newWorkExperience;

                    newWorkExperience = {
                        CompanyName: req.body.CompanyName,
                        Designation: req.body.Designation,
                        FromDate: req.body.FromDate,
                        ToDate: req.body.ToDate
                    };

                    WorkExperience.create(newWorkExperience, function (
                        err,
                        workExperience
                    ) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            employee.workExperience.push(workExperience);
                            employee.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    res.send("err");
                                } else {
                                    console.log(data);
                                    res.send(workExperience);
                                }
                            });
                            console.log("new WorkExperience Saved");
                        }
                    });
                    console.log(req.body);
                }
            });
        }
    });
});

router.put("/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newWorkExperience;

            newWorkExperience = {
                CompanyName: req.body.CompanyName,
                Designation: req.body.Designation,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate
            };

            WorkExperience.findByIdAndUpdate(
                req.params.id,
                newWorkExperience,
                function (err, workExperience) {
                    if (err) {
                        res.send("error");
                    } else {
                        res.send(newWorkExperience);
                    }
                }
            );
        }
        console.log("put");
        console.log(req.body);
    });
});

router.delete("/Work-experience/:id/:id2", verifyEmployee, (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            WorkExperience.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                workExperience
            ) {
                if (!err) {
                    console.log("WorkExperience deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { workExperience: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(workExperience);
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
