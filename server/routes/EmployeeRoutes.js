// const Joi = require("joi");

// const {
//     verifyHR
// } = require("./middlewares");
// const router = require("express").Router();

// const Employee = require("../models/EmployeeSchema");
// const { EmployeeValidation } = require("../models/EmployeeSchema");

// router.get("/", verifyHR, (req, res) => {
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.find()
//         // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "role position department"
//             // populate: {
//             //   path: "state",
//             //   model: "State",
//             //   populate: {
//             //     path: "country",
//             //     model: "Country"
//             //   }
//             // }
//         })
//         .select("-salary -education -familyInfo -workExperience -Password")
//         .exec(function (err, employee) {
//             res.send(employee);
//         });
// });

// router.post("/", verifyHR, (req, res) => {
//     Joi.validate(req.body, EmployeeValidation, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err.details[0].message);
//         } else {
//             let newEmployee;

//             newEmployee = {
//                 Email: req.body.Email,
//                 Password: req.body.Password,
//                 role: req.body.RoleID,
//                 Account: req.body.Account,
//                 Gender: req.body.Gender,
//                 FirstName: req.body.FirstName,
//                 MiddleName: req.body.MiddleName,
//                 LastName: req.body.LastName,
//                 DOB: req.body.DOB,
//                 ContactNo: req.body.ContactNo,
//                 EmployeeCode: req.body.EmployeeCode,
//                 department: req.body.DepartmentID,
//                 position: req.body.PositionID,
//                 DateOfJoining: req.body.DateOfJoining,
//                 TerminateDate: req.body.TerminateDate
//             };

//             Employee.create(newEmployee, function (err, employee) {
//                 if (err) {
//                     console.log(err);
//                     res.send("error");
//                 } else {
//                     res.send(employee);

//                     console.log("new employee Saved");
//                 }
//             });
//             console.log(req.body);
//         }
//     });
// });

// router.put("/:id", verifyHR, (req, res) => {
//     Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err.details[0].message);
//         } else {
//             let newEmployee;
//             newEmployee = {
//                 Email: req.body.Email,
//                 Password: req.body.Password,
//                 Account: req.body.Account,
//                 role: req.body.RoleID,
//                 Gender: req.body.Gender,
//                 FirstName: req.body.FirstName,
//                 MiddleName: req.body.MiddleName,
//                 LastName: req.body.LastName,
//                 DOB: req.body.DOB,
//                 ContactNo: req.body.ContactNo,
//                 EmployeeCode: req.body.EmployeeCode,
//                 department: req.body.DepartmentID,
//                 position: req.body.PositionID,
//                 DateOfJoining: req.body.DateOfJoining,
//                 TerminateDate: req.body.TerminateDate
//             };

//             Employee.findByIdAndUpdate(req.params.id, newEmployee, function (
//                 err,
//                 employee
//             ) {
//                 if (err) {
//                     res.send("error");
//                 } else {
//                     res.send(newEmployee);
//                 }
//             });
//         }

//         console.log("put");
//         console.log(req.body);
//     });
// });

// router.delete("/:id", verifyHR, (req, res) => {
//     // Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
//     //   if (!err) {
//     //     console.log(" state deleted");
//     //     res.send(employee);
//     //   } else {
//     //     console.log(err);
//     //     res.send("error");
//     //   }
//     // });
//     res.send("error");
//     console.log("delete");
//     console.log(req.params.id);
// });

// module.exports = router;


const Joi = require("joi");

const {
    verifyHR
} = require("./middlewares");
const router = require("express").Router();

const Employee = require("../models/EmployeeSchema");
const { EmployeeValidation } = require("../models/EmployeeSchema");

router.get("/", verifyHR, (req, res) => {
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "role position department"
            // populate: {
            //   path: "state",
            //   model: "State",
            //   populate: {
            //     path: "country",
            //     model: "Country"
            //   }
            // }
        })
        .select("-salary -education -familyInfo -workExperience -Password")
        .exec(function (err, employee) {
            res.send(employee);
        });
});

router.post("/", verifyHR, (req, res) => {
    Joi.validate(req.body, EmployeeValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEmployee;

            newEmployee = {
                Email: req.body.Email,
                Password: req.body.Password,
                role: req.body.RoleID,
                Account: req.body.Account,
                Gender: req.body.Gender,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                DOB: req.body.DOB,
                ContactNo: req.body.ContactNo,
                EmployeeCode: req.body.EmployeeCode,
                department: req.body.DepartmentID,
                position: req.body.PositionID,
                DateOfJoining: req.body.DateOfJoining,
                TerminateDate: req.body.TerminateDate
            };

            Employee.create(newEmployee, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(employee);

                    console.log("new employee Saved");
                }
            });
            console.log(req.body);
        }
    });
});

router.put("/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEmployee;
            newEmployee = {
                Email: req.body.Email,
                // Password: req.body.Password,
                Account: req.body.Account,
                role: req.body.RoleID,
                Gender: req.body.Gender,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                DOB: req.body.DOB,
                ContactNo: req.body.ContactNo,
                EmployeeCode: req.body.EmployeeCode,
                department: req.body.DepartmentID,
                position: req.body.PositionID,
                DateOfJoining: req.body.DateOfJoining,
                TerminateDate: req.body.TerminateDate
            };

            Employee.findByIdAndUpdate(req.params.id, newEmployee, function (
                err,
                employee
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newEmployee);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/:id", verifyHR, (req, res) => {
    // Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
    //   if (!err) {
    //     console.log(" state deleted");
    //     res.send(employee);
    //   } else {
    //     console.log(err);
    //     res.send("error");
    //   }
    // });
    res.send("error");
    console.log("delete");
    console.log(req.params.id);
});

module.exports = router;
