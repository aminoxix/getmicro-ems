const Joi = require("joi");

const {
    verifyHR
} = require("./middlewares");
const router = require("express").Router();

const Employee = require("../models/EmployeeSchema");
const LeaveApplication = require("../models/LeaveApplicationSchema");

router.get("/", verifyHR, (req, res) => {
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    LeaveApplication.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "employee"
        })
        // .select(" -role -position -department")
        // .select("FirstName LastName MiddleName"
        // )
        .exec(function (err, leaveApplication) {
            // console.log(filteredCompany);
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(leaveApplication);
            }
        });
});

router.put("/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, LeaveApplicationHRValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newLeaveApplication;

            newLeaveApplication = {
                Status: req.body.Status
            };
            LeaveApplication.findByIdAndUpdate(
                req.params.id,
                {
                    $set: newLeaveApplication
                },
                function (err, numberAffected) {
                    console.log(numberAffected);
                    res.send(newLeaveApplication);
                }
            );

            console.log(req.body);
        }
    });
});

router.delete("/:id/:id2", verifyHR, (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                leaveApplication
            ) {
                if (!err) {
                    console.log("LeaveApplication deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { leaveApplication: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(leaveApplication);
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
