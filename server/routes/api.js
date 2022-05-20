const Joi = require("joi");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWTKEY;

const {
    verifyAdmin,
    verifyAdminHR,
    verifyHR,
    verifyHREmployee,
    verifyEmployee
} = require("./middlewares");
const router = require("express").Router();
module.exports = router;

const City = require("../models/CitySchema");
const { CityValidation } = require("../models/CitySchema");

const State = require("../models/StateSchema");
const { StateValidation } = require("../models/StateSchema");

const Country = require("../models/CountrySchema");
const { CountryValidation } = require("../models/CountrySchema");

const Education = require("../models/EducationSchema");
const { EducationValidation } = require("../models/EducationSchema");

const Employee = require("../models/EmployeeSchema");
const { EmployeeValidation } = require("../models/EmployeeSchema");

const Department = require("../models/DepartmentSchema");
const { DepartmentValidation } = require("../models/DepartmentSchema");

const Position = require("../models/PositionSchema");
const { PositionValidation } = require("../models/PositionSchema");

const FamilyInfo = require("../models/FamilyInfoSchema");
const { FamilyInfoValidation } = require("../models/FamilyInfoSchema");

const LeaveApplication = require("../models/LeaveApplicationSchema");
const { LeaveApplicationValidation } = require("../models/LeaveApplicationSchema");

const Portal = require("../models/PortalSchema");
const { PortalValidation } = require("../models/PortalSchema");

const Project = require("../models/ProjectSchema");
const { ProjectValidation } = require("../models/ProjectSchema");

const Role = require("../models/RoleSchema");
const { RoleValidation } = require("../models/RoleSchema");

const Salary = require("../models/SalarySchema");
const { SalaryValidation } = require("../models/SalarySchema");

const WorkExperience = require("../models/WorkExperienceSchema");
const { WorkExperienceValidation } = require("../models/WorkExperienceSchema");

const Company = require("../models/CompanySchema");
const { CompanyValidation } = require("../models/CompanySchema");

router.get("/role", verifyAdminHR, (req, res) => {
    Role.find()
        .populate("company")
        .exec(function (err, role) {
            res.send(role);
        });
});

router.post("/role", verifyAdminHR, (req, res) => {
    Joi.validate(req.body, RoleValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newRole;

            newRole = {
                RoleName: req.body.RoleName,
                company: req.body.CompanyID
            };

            Role.create(newRole, function (err, role) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(role);
                    console.log("new Role Saved");
                }
            });
            // }
            console.log(req.body);
        }
    });
});

router.put("/role/:id", verifyAdminHR, (req, res) => {
    Joi.validate(req.body, RoleValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let updateRole;

            updateRole = {
                RoleName: req.body.RoleName,
                company: req.body.CompanyID
            };

            Role.findByIdAndUpdate(req.params.id, updateRole, function (err, role) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(updateRole);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});
router.delete("/role/:id", verifyAdminHR, (req, res) => {
    Employee.find({ role: req.params.id }, function (err, r) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (r.length == 0) {
                Role.findByIdAndRemove({ _id: req.params.id }, function (err, role) {
                    if (!err) {
                        console.log(" Role deleted");
                        res.send(role);
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
                        "This role is associated with Employee so you can not delete this"
                    );
            }
        }
    });
});
router.get("/position", verifyAdminHR, (req, res) => {
    Position.find()
        .populate("company")
        .exec(function (err, role) {
            res.send(role);
        });
});

router.post("/position", verifyAdminHR, (req, res) => {
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
router.put("/position/:id", verifyAdminHR, (req, res) => {
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

router.delete("/position/:id", verifyAdminHR, (req, res) => {
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

//Department
router.get("/department", verifyAdminHR, (req, res) => {
    Department.find()
        .populate("company")
        .exec(function (err, employees) {
            res.send(employees);
        });
});
router.post("/department", verifyAdminHR, (req, res) => {
    Joi.validate(req.body, DepartmentValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newDepartment;

            newDepartment = {
                DepartmentName: req.body.DepartmentName,
                company: req.body.CompanyID
            };

            Department.create(newDepartment, function (err, department) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(department);
                    console.log("new Role Saved");
                }
            });
        }
        console.log(req.body);
    });
});
router.put("/department/:id", verifyAdminHR, (req, res) => {
    Joi.validate(req.body, DepartmentValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let updateDepartment;

            updateDepartment = {
                DepartmentName: req.body.DepartmentName,
                company: req.body.CompanyID
            };

            Department.findByIdAndUpdate(req.params.id, updateDepartment, function (
                err,
                department
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(updateDepartment);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/department/:id", verifyAdminHR, (req, res) => {
    Employee.find({ department: req.params.id }, function (err, d) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (d.length == 0) {
                Department.findByIdAndRemove({ _id: req.params.id }, function (
                    err,
                    department
                ) {
                    if (!err) {
                        console.log("department deleted");
                        res.send(department);
                        // });
                        console.log("new Department Saved");
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
                        "This department is associated with Employee so you can not delete this"
                    );
            }
        }
    });
});

router.get("/admin/portal", verifyAdmin, (req, res) => {
    Portal.find()
        .populate({ path: "projects" })
        .exec(function (err, portalData) {
            if (err) {
                res.send("err");
                console.log(err);
            }
            res.send(portalData);
        });
});

router.post("/admin/portal", verifyAdmin, (req, res) => {
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newPortal;
            newPortal = {
                PortalName: req.body.PortalName,
                Status: req.body.Status
            };

            Portal.create(newPortal, function (err, portalData) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(portalData);
                    console.log("new Portal Saved");
                }
            });
            console.log(req.body);
        }
    });
});

router.put("/admin/portal/:id", verifyAdmin, (req, res) => {
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let updatePortal;
            updatePortal = {
                PortalName: req.body.PortalName,
                Status: req.body.Status
            };
            Portal.findByIdAndUpdate(req.body._id, updatePortal, function (
                err,
                Portal
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(updatePortal);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/admin/portal/:id", verifyAdmin, (req, res) => {
    Portal.findByIdAndRemove({ _id: req.params.id }, function (err, portal) {
        if (!err) {
            console.log("portal deleted");
            res.send(portal);
            Project.deleteMany({ portals: { _id: portal._id } }, function (err) {
                if (err) {
                    res.send("error");
                    console.log(err);
                }
            });
            console.log("new Portal Saved");
        } else {
            console.log("error");
            res.send("err");
        }
    });
    console.log("delete");
    console.log(req.params.id);
});

///*********bid */

router.get("/admin/project-bid", verifyAdmin, (req, res) => {
    // var employee = {};

    Project.find()
        .populate("portals")
        .exec(function (err, project) {
            if (err) {
                console.log(err);
                res.send("err");
            } else {
                res.send(project);
            }
        });
});

router.post("/admin/project-bid", verifyAdmin, (req, res) => {
    Joi.validate(req.body, ProjectValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let project;
            project = {
                ProjectTitle: req.body.ProjectTitle,
                ProjectURL: req.body.ProjectURL,
                ProjectDesc: req.body.ProjectDesc,
                portals: req.body.Portal_ID,
                EstimatedTime: req.body.EstimatedTime,
                EstimatedCost: req.body.EstimatedCost,
                ResourceID: req.body.ResourceID,
                Status: req.body.Status,
                Remark: req.body.Remark
            };
            Project.create(project, function (err, project) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(project);
                    console.log("new project Saved");
                }
            });
            console.log(req.body);
        }
    });
});

router.put("/admin/project-bid/:id", verifyAdmin, (req, res) => {
    Joi.validate(req.body, ProjectValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let updateProject;
            updateProject = {
                ProjectTitle: req.body.ProjectTitle,
                ProjectURL: req.body.ProjectURL,
                ProjectDesc: req.body.ProjectDesc,
                portals: req.body.Portal_ID,
                EstimatedTime: req.body.EstimatedTime,
                EstimatedCost: req.body.EstimatedCost,
                ResourceID: req.body.ResourceID,
                Status: req.body.Status,
                Remark: req.body.Remark
            };

            Project.findByIdAndUpdate(req.params.id, updateProject, function (
                err,
                Project
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(updateProject);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/admin/project-bid/:id", verifyAdmin, (req, res) => {
    Project.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
        if (err) {
            console.log("error");
            res.send("err");
        } else {
            console.log("project deleted");
            res.send(project);
        }
    });
    console.log("delete");
    console.log(req.params.id);
});

/////////////////////////////////////
//////   HR                      ////
/////////////////////////////////////

router.get("/country", verifyHR, (req, res) => {
    Country.find()
        .populate({ path: "states", populate: { path: "cities" } })
        .exec(function (err, country) {
            res.send(country);
        });
});

router.post("/country", verifyHR, (req, res) => {
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

router.put("/country/:id", verifyHR, (req, res) => {
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

router.delete("/country/:id", verifyHR, (req, res) => {
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

router.get("/state", verifyHR, (req, res) => {
    State.find()
        .populate("country citiesx")
        .exec(function (err, country) {
            res.send(country);
        });
});
//State
router.post("/state", verifyHR, (req, res) => {
    Joi.validate(req.body, StateValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newState;

            newState = {
                StateName: req.body.StateName,
                country: req.body.CountryID
            };

            State.create(newState, function (err, state) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    Country.findById(req.body.CountryID, function (err, country) {
                        if (err) {
                            console.log(err);
                            res.send("err");
                        } else {
                            country.states.push(state);
                            country.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    res.send("err");
                                } else {
                                    console.log(data);
                                    res.send(state);
                                }
                            });
                        }
                    });
                    console.log("new country Saved");
                }
            });
            console.log(req.body);
        }
    });
});
//State
//state
router.put("/state/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, StateValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newState;

            newState = {
                StateName: req.body.StateName,
                country: req.body.CountryID
            };

            State.findByIdAndUpdate(req.params.id, newState, function (err, state) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newState);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/state/:id", verifyHR, (req, res) => {
    State.findById(req.params.id, function (err, foundState) {
        if (err) {
            res.send(err);
        } else {
            // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
            if (!foundState.cities.length == 0) {
                res
                    .status(403)
                    .send(
                        "First Delete All The cities in this state before deleting this state"
                    );
            } else {
                State.findByIdAndRemove({ _id: req.params.id }, function (err, state) {
                    if (!err) {
                        console.log(" state deleted");
                        console.log("country id---------", state.country[0]);
                        Country.update(
                            { _id: state.country[0] },
                            { $pull: { states: state._id } },
                            function (err, numberAffected) {
                                console.log(numberAffected);
                                res.send(state);
                            }
                        );
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

/////////////city

router.get("/city", verifyHR, (req, res) => {
    City.find()
        .populate({ path: "state", populate: { path: "country" } })
        .exec(function (err, city) {
            // employee = employees;
            res.send(city);
        });
});
router.post("/city", verifyHR, (req, res) => {
    Joi.validate(req.body, CityValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newCity;

            newCity = {
                CityName: req.body.CityName,
                state: req.body.StateID
            };

            City.create(newCity, function (err, city) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    State.findById(req.body.StateID, function (err, state) {
                        if (err) {
                            console.log(err);
                            res.send("err");
                        } else {
                            state.cities.push(city);
                            state.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    res.send("err");
                                } else {
                                    console.log(data);
                                    res.send(city);
                                }
                            });
                        }
                    });

                    console.log("new city Saved");
                }
            });
            console.log(req.body);
        }
    });
});
router.put("/city/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, CityValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newCity;

            newCity = {
                CityName: req.body.CityName,
                state: req.body.StateID
            };

            City.findByIdAndUpdate(req.params.id, newCity, function (err, city) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newCity);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/city/:id", verifyHR, (req, res) => {
    Company.find({ city: req.params.id }, function (err, country) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(country.length == 0);
            if (country.length == 0) {
                City.findByIdAndRemove({ _id: req.params.id }, function (err, city) {
                    if (!err) {
                        console.log(" state deleted");
                        State.update(
                            { _id: city.state[0] },
                            { $pull: { cities: city._id } },
                            function (err, numberAffected) {
                                console.log(numberAffected);
                                res.send(city);
                            }
                        );
                    } else {
                        console.log(err);
                        res.send("error");
                    }
                });
            } else {
                res
                    .status(403)
                    .send(
                        "This city is associated with company so you can not delete this"
                    );
            }
        }
    });

    console.log("delete");
    console.log(req.params.id);
});

///////////////////////////
////////////company

router.get("/company", verifyAdminHR, (req, res) => {
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
        .exec(function (err, compnay) {
            res.send(compnay);
        });
});
router.post("/company", verifyHR, (req, res) => {
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
                    res.send(newCompany);
                    console.log("new company Saved");
                }
            });
            console.log(req.body);
        }
    });
});
router.put("/company/:id", verifyHR, (req, res) => {
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
/////////////////////////////////
/////////////////////Employee

router.get("/employee", verifyHR, (req, res) => {
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

router.post("/employee", verifyHR, (req, res) => {
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

router.put("/employee/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEmployee;
            newEmployee = {
                Email: req.body.Email,
                Password: req.body.Password,
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

router.delete("/employee/:id", verifyHR, (req, res) => {
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

////////////////////////////////
//////////////////salary
router.get("/salary", verifyHR, (req, res) => {
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "salary"
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
        .exec(function (err, company) {
            // employee = employees;
            let filteredCompany = company.filter(data => data["salary"].length == 1);
            // console.log(filteredCompany);
            res.send(filteredCompany);
        });
});

router.post("/salary/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, SalaryValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            Employee.findById(req.params.id, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("err");
                } else {
                    if (employee.salary.length == 0) {
                        let newSalary;

                        newSalary = {
                            BasicSalary: req.body.BasicSalary,
                            BankName: req.body.BankName,
                            AccountNo: req.body.AccountNo,
                            AccountHolderName: req.body.AccountHolderName,
                            IFSCcode: req.body.IFSCcode,
                            TaxDeduction: req.body.TaxDeduction
                        };

                        Salary.create(newSalary, function (err, salary) {
                            if (err) {
                                console.log(err);
                                res.send("error");
                            } else {
                                employee.salary.push(salary);
                                employee.save(function (err, data) {
                                    if (err) {
                                        console.log(err);
                                        res.send("err");
                                    } else {
                                        console.log(data);
                                        res.send(salary);
                                    }
                                });
                                console.log("new salary Saved");
                            }
                        });
                        console.log(req.body);
                    } else {
                        res
                            .status(403)
                            .send("Salary Information about this employee already exits");
                    }
                }
            });
        }
    });
});

router.put("/salary/:id", verifyHR, (req, res) => {
    Joi.validate(req.body, SalaryValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newSalary;

            newSalary = {
                BasicSalary: req.body.BasicSalary,
                BankName: req.body.BankName,
                AccountNo: req.body.AccountNo,
                AccountHolderName: req.body.AccountHolderName,
                IFSCcode: req.body.IFSCcode,
                TaxDeduction: req.body.TaxDeduction
            };

            Salary.findByIdAndUpdate(req.params.id, newSalary, function (err, salary) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newSalary);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});

router.delete("/salary/:id", verifyHR, (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        console.log("uuuuuuuunnnnnnnnnnnnnnndef", employee.salary[0]);
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            Salary.findByIdAndRemove({ _id: employee.salary[0] }, function (
                err,
                salary
            ) {
                if (!err) {
                    console.log("salary deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { salary: employee.salary[0] } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(salary);
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

//////////////////////////////////////
/////////////////////////////////////
/////////////////////////////Employee dashboard
/////////////////////////////////////
/////////////////////////////////////

////////////////////////////////////
////////////////////////////personal info

router.get("/personal-info/:id", verifyHREmployee, (req, res) => {
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

router.put("/personal-info/:id", verifyEmployee, (req, res) => {
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

////////////////////////////////
////////////////////education
router.get("/education/:id", verifyHREmployee, (req, res) => {
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "education"
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

router.post("/education/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, EducationValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            Employee.findById(req.params.id, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("err");
                } else {
                    let newEducation;

                    newEducation = {
                        SchoolUniversity: req.body.SchoolUniversity,
                        Degree: req.body.Degree,
                        Grade: req.body.Grade,
                        PassingOfYear: req.body.PassingOfYear
                    };

                    Education.create(newEducation, function (err, education) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            employee.education.push(education);
                            employee.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    res.send("err");
                                } else {
                                    console.log(data);
                                    res.send(education);
                                }
                            });
                            console.log("new Education Saved");
                        }
                    });
                    console.log(req.body);
                }
            });
        }
    });
});

router.put("/education/:id", verifyEmployee, (req, res) => {
    Joi.validate(req.body, EducationValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEducation;

            newEducation = {
                SchoolUniversity: req.body.SchoolUniversity,
                Degree: req.body.Degree,
                Grade: req.body.Grade,
                PassingOfYear: req.body.PassingOfYear
            };

            Education.findByIdAndUpdate(req.params.id, newEducation, function (
                err,
                education
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newEducation);
                }
            });
        }
        console.log("put");
        console.log(req.body);
    });
});

router.delete("/education/:id/:id2", verifyEmployee, (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            Education.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                education
            ) {
                if (!err) {
                    console.log("education deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { education: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(education);
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

//////////////////////////////////
//////////////////////////familyInfo
router.get("/family-info/:id", verifyHREmployee, (req, res) => {
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

router.post("/family-info/:id", verifyEmployee, (req, res) => {
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

router.put("/family-info/:id", verifyEmployee, (req, res) => {
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

router.delete("/family-info/:id/:id2", verifyEmployee, (req, res) => {
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

//////////////////////////////////
//////////////////////////WorkExperience workExperience
router.get("/work-experience/:id", verifyHREmployee, (req, res) => {
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

router.post("/work-experience/:id", verifyEmployee, (req, res) => {
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

router.put("/work-experience/:id", verifyEmployee, (req, res) => {
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

/////////////////////
////////////LeaveApplication leaveApplication leave-application-emp
router.get("/leave-application-emp/:id", verifyEmployee, (req, res) => {
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

router.post("/leave-application-emp/:id", verifyEmployee, (req, res) => {
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

router.put("/leave-application-emp/:id", verifyEmployee, (req, res) => {
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
    "/leave-application-emp/:id/:id2",
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

/////////////////////
////////////LeaveApplication leaveApplication HHHHHHRRRRR
router.get("/leave-application-hr", verifyHR, (req, res) => {
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

router.put("/leave-application-hr/:id", verifyHR, (req, res) => {
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

router.delete("/leave-application-hr/:id/:id2", verifyHR, (req, res) => {
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

//////////////////////////////////
/////////////////////login

router.post("/login", (req, res) => {
    console.log(req.body);
    Joi.validate(
        req.body,
        Joi.object().keys({
            email: Joi.string()
                .max(200)
                .required(),
            password: Joi.string()
                .max(100)
                .required()
        }),
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).send(err.details[0].message);
            } else {
                Employee.findOne(
                    { Email: req.body.email },
                    "Password _id Account FirstName LastName",
                    function (err, document) {
                        if (err || document == null) {
                            res.send("false");
                        } else {
                            if (document.Password == req.body.password) {
                                emp = {
                                    _id: document._id,
                                    Account: document.Account,
                                    FirstName: document.FirstName,
                                    LastName: document.LastName
                                };
                                var token = jwt.sign(emp, jwtKey);
                                res.send(token);
                            } else {
                                res.sendStatus(400);
                            }
                        }
                    }
                );
            }
        }
    );
});
