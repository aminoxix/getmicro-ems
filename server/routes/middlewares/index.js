const jwt = require("jsonwebtoken");
const { JWTKEY } = require("../../config");

function verifyAdmin(req, res, next) {
    // console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.Account)
        jwt.verify(Header, JWTKEY, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                if (authData.Account == 1) {
                    next();
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
function verifyAdminHR(req, res, next) {
    // console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.Account)
        jwt.verify(Header, JWTKEY, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                if (authData.Account == 1 || authData.Account == 2) {
                    next();
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
function verifyHR(req, res, next) {
    // console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.Account)
        jwt.verify(Header, JWTKEY, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                if (authData.Account == 2) {
                    next();
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
function verifyHREmployee(req, res, next) {
    // console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.Account)
        jwt.verify(Header, JWTKEY, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                if (authData.Account == 2) {
                    next();
                } else if (authData.Account == 3) {
                    if (authData._id == req.params.id) {


                        next();
                    }
                    else {
                        res.sendStatus(403);

                    }


                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}
function verifyEmployee(req, res, next) {
    // console.log(req.headers["authorization"]);
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.Account)
        jwt.verify(Header, JWTKEY, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                if (authData._id == req.params.id) {
                    console.log(authData);
                    if (authData.Account == 3) {
                        next();
                    } else {
                        res.sendStatus(403);
                    }
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = {
    verifyAdmin,
    verifyAdminHR,
    verifyHR,
    verifyHREmployee,
    verifyEmployee
};