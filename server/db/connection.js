const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

function connection(DATABASEURL) {

    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.connect(DATABASEURL)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) =>
            console.log("Error while connecting to database", err)
        );

    const conn = mongoose.createConnection(DATABASEURL);
    autoIncrement.initialize(conn);

    return conn;
}

module.exports = connection;