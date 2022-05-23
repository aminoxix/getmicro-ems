const Joi = require("joi");

const {
    verifyEmployee
} = require("./middlewares");
const router = require("express").Router();

const Employee = require("../models/EmployeeSchema");

const LeaveApplication = require("../models/LeaveApplicationSchema");
const { LeaveApplicationValidation } = require("../models/LeaveApplicationSchema");

router.get("/:id", verifyEmployee, (req, res) => {
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "leaveApplication"
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
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(employee);
            }
        });
});

router.post("/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            Employee.findById(req.params.id, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("err");
                } else {
                    let newLeaveApplication;
                    newLeaveApplication = {
                        Leavetype: req.body.Leavetype,
                        FromDate: req.body.FromDate,
                        ToDate: req.body.ToDate,
                        Reasonforleave: req.body.Reasonforleave,
                        Status: req.body.Status,
                        employee: req.params.id
                    };

                    LeaveApplication.create(newLeaveApplication, function (
                        err,
                        leaveApplication
                    ) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            employee.leaveApplication.push(leaveApplication);
                            employee.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    res.send("err");
                                } else {
                                    console.log(data);
                                    res.send(leaveApplication);
                                }
                            });
                            console.log("new leaveApplication Saved");
                        }
                    });
                    console.log(req.body);
                }
            });
        }
    });
});

router.put("/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, LeaveApplicationValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newLeaveApplication;

            newLeaveApplication = {
                Leavetype: req.body.Leavetype,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate,
                Reasonforleave: req.body.Reasonforleave,
                Status: req.body.Status,
                employee: req.params.id
            };

            LeaveApplication.findByIdAndUpdate(
                req.params.id,
                newLeaveApplication,
                function (err, leaveApplication) {
                    if (err) {
                        res.send("error");
                    } else {
                        res.send(newLeaveApplication);
                    }
                }
            );
        }
        console.log("put");
        console.log(req.body);
    });
});

router.delete(
    "/:id/:id2",
    verifyEmployee,
    (req, res) => {
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
    }
);

module.exports = router;
