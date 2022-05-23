const Joi = require("joi");

const {
    verifyAdminHR
} = require("./middlewares");
const router = require("express").Router();

const Employee = require("../models/EmployeeSchema");

const Position = require("../models/PositionSchema");
const { PositionValidation } = require("../models/PositionSchema");

router.get("", verifyAdminHR, (req, res) => {
    Position.find()
        .populate("company")
        .exec(function (err, role) {
            res.send(role);
        });
});

router.post("/", verifyAdminHR, (req, res) => {
    Joi.validate(req.body, PositionValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newPosition;

            newPosition = {
                PositionName: req.body.PositionName,
                company: req.body.CompanyID
            };

            Position.create(newPosition, function (err, position) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(position);
                    console.log("new Role Saved");
                }
            });
        }
        console.log(req.body);
    });
});
router.put("/:id", verifyAdminHR, (req, res) => {
    Joi.validate(req.body, PositionValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let updatePosition;

            updatePosition = {
                PositionName: req.body.PositionName,
                company: req.body.CompanyID
            };

            Position.findByIdAndUpdate(req.params.id, updatePosition, function (
                err,
                position
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(updatePosition);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/:id", verifyAdminHR, (req, res) => {
    Employee.find({ position: req.params.id }, function (err, p) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (p.length == 0) {
                Position.findByIdAndRemove({ _id: req.params.id }, function (
                    err,
                    position
                ) {
                    if (!err) {
                        console.log("position deleted");
                        res.send(position);
                        // });
                        console.log("new Position Saved");
                    } else {
                        console.log("error");
                        res.send("err");
                    }
                });
                console.log("delete");
                console.log(req.params.id);
            } else {
                res
                    .status(403)
                    .send(
                        "This Position is associated with Employee so you can not delete this"
                    );
            }
        }
    });
});

module.exports = router;
