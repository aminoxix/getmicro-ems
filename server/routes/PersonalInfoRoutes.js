const Joi = require("joi");

const {
    verifyHREmployee,
    verifyEmployee
} = require("./middlewares");
const router = require("express").Router();

const Employee = require("../models/EmployeeSchema");

router.get("/:id", verifyHREmployee, (req, res) => {
    console.log("personal-info", req.params.id);
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "role position department"
            //   // populate: {
            //   //   path: "state",
            //   //   model: "State",
            //   //   populate: {
            //   //     path: "country",
            //   //     model: "Country"
            //   //   }
            //   // }
        })
        .select("-salary -education -familyInfo -workExperience")
        .exec(function (err, employee) {
            // employee = employees;
            res.send(employee);
        });
});

router.put("/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEmployee;

            newEmployee = {
                BloodGroup: req.body.BloodGroup,
                ContactNo: req.body.ContactNo,
                DOB: req.body.DOB,
                Email: req.body.Email,
                EmergencyContactNo: req.body.EmergencyContactNo,
                Gender: req.body.Gender,
                Hobbies: req.body.Hobbies,
                PANcardNo: req.body.PANcardNo,
                PermanetAddress: req.body.PermanetAddress,
                PresentAddress: req.body.PresentAddress
            };
            Employee.findByIdAndUpdate(
                req.params.id,
                {
                    $set: newEmployee
                },
                function (err, numberAffected) {
                    console.log(numberAffected);
                    res.send(newEmployee);
                }
            );
        }

        console.log("put");
        console.log(req.body);
    });
});

module.exports = router;
