var express = require("express"),
  // Joi = require("joi"),
  app = express();
const connection = require("./db/connection");
const { DATABASEURL, PORT } = require("./config");
//connecting to mongodb
connection(DATABASEURL);
//seting up jwt token

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Server successfully started!");
});

//for request body
app.use(express.json());
app.use('/api', require('./routes/api'));
if (PORT & process.env.IP) {
  app.listen(PORT, process.env.IP, () => {
    console.log("started");
  });
} else
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
