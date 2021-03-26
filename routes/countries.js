const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { RecordSerializer } = require('forest-express-sequelize');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('countries');

const {COUNTRIES} = require("../data");
const recordSerializer = new RecordSerializer({ name: 'countries' });

// Get a list of countries
router.get('/countries', permissionMiddlewareCreator.list(), async (request, response, next) => {
  response.status(400).send({error: "Countries can only be listed in Planets/Detail/Related data/Countries"});
});

// Get a number of countries
router.get('/countries/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  console.log("GET /countries/count")
  next();
});

// Get a Order
router.get('/countries/:recordId', permissionMiddlewareCreator.details(), async (request, response, next) => {
  console.log("GET /countries/:recordId", request.params.recordId)
  try {
    const country = COUNTRIES.find(country => country.id === request.params.recordId);
    response.send(await recordSerializer.serialize(country));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
