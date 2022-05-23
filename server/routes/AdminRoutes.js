const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { JWTKEY } = require("../config");

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

router.get("/portal", verifyAdmin, (req, res) => {
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

router.post("/portal", verifyAdmin, (req, res) => {
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

router.put("/portal/:id", verifyAdmin, (req, res) => {
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

router.delete("/portal/:id", verifyAdmin, (req, res) => {
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

router.get("/project-bid", verifyAdmin, (req, res) => {
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

router.post("/project-bid", verifyAdmin, (req, res) => {
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

router.put("/project-bid/:id", verifyAdmin, (req, res) => {
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

router.delete("/project-bid/:id", verifyAdmin, (req, res) => {
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