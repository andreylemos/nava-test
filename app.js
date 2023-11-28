var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var personsRouter = require('./routes/persons');

var mongoDB = "mongodb+srv://andreyvvl:NT7vgq0gJHIrpavF@cluster0.ayb5sao.mongodb.net/nava";

var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Andrey",
        url: "",
        email: "",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger
var specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use('/', indexRouter);
app.use('/persons', personsRouter);

module.exports = app;


//database
//NT7vgq0gJHIrpavF
//andreyvvl