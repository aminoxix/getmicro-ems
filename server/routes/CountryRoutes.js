const Joi = require("joi");

const {
    verifyHR
} = require("./middlewares");
const router = require("express").Router();

const City = require("../models/CitySchema");

const State = require("../models/StateSchema");

const Country = require("../models/CountrySchema");
const { CountryValidation } = require("../models/CountrySchema");

router.get("/", verifyHR, (req, res) => {
    Country.find()
        .populate({ path: "states", populate: { path: "cities" } })
        .exec(function (err, country) {
            res.send(country);
        });
});

router.post("/", verifyHR, (req, res) => {
    Joi.validate(req.body, CountryValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newCountry;

            newCountry = {
                CountryName: req.body.CountryName
            };

            Country.create(newCountry, function (err, country) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(country);
                    console.log("new country Saved");
                }
            });
            console.log(req.body);
        }
    });
});

router.put("/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, CountryValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newCountry;

            newCountry = {
                CountryName: req.body.CountryName
            };
            Country.findByIdAndUpdate(req.params.id, newCountry, function (
                err,
                country
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newCountry);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/:id", verifyHR, (req, res) => {
    Country.findById(req.params.id, function (err, foundCountry) {
        if (err) {
            res.send(err);
        } else {
            console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
            if (!foundCountry.states.length == 0) {
                res
                    .status(403)
                    .send(
                        "First Delete All The states in this country before deleting this country"
                    );
            } else {
                Country.findByIdAndRemove({ _id: req.params.id }, function (
                    err,
                    country
                ) {
                    if (!err) {
                        State.deleteMany({ country: { _id: req.params.id } }, function (
                            err
                        ) {
                            if (err) {
                                console.log(err);
                                res.send("error");
                            } else {
                                City.deleteMany(
                                    { state: { country: { _id: req.params.id } } },
                                    function (err) {
                                        if (err) {
                                            console.log(err);
                                            res.send("error");
                                        } else {
                                            console.log(" Country deleted");
                                            res.send(country);
                                        }
                                    }
                                );
                            }
                        });
                    } else {
                        console.log(err);
                        res.send("error");
                    }
                });
            }
        }
    });

    console.log("delete");
    console.log(req.params.id);
});

module.exports = router;
