const express = require('express');
const { PermissionMiddlewareCreator } = require('forest-express-sequelize');
const { RecordSerializer } = require('forest-express-sequelize');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('planets');

const {COUNTRIES, PLANETS} = require("../data");
const recordSerializer = new RecordSerializer({ name: 'planets' });

// Get a list of planets
router.get('/planets', permissionMiddlewareCreator.list(), async (request, response, next) => {
  console.log("GET /planets")
  try {
    const planets = await recordSerializer.serialize(PLANETS);
    response.send({ ...planets, meta:{ count: PLANETS.length }});
  } catch (err) {
    next(err);
  }
});

// Get a number of planets
router.get('/planets/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  console.log("GET /planets/count")
  next();
});

// Get a Order
router.get('/planets/:recordId', permissionMiddlewareCreator.details(), async (request, response, next) => {
  console.log("GET /planets/:recordId", request.params.recordId)
  try {
    const planet = PLANETS.find(planet => planet.id === request.params.recordId);
    response.send(await recordSerializer.serialize(planet));
  } catch (err) {
    next(err);
  }
});

// http://localhost:3310/forest/planets/00001/relationships/countries?fields%5Bcountries%5D=name%2Cplanet&fields%5Bplanet%5D=name&page%5Bnumber%5D=1&page%5Bsize%5D=15&timezone=Europe%2FBratislava
router.get('/planets/:recordId/relationships/countries', permissionMiddlewareCreator.details(), async (request, response, next) => {
  console.log("GET /planets/:recordId/relationships/countries")
  try {
    const planetId = request.params.recordId;
    const countries = await recordSerializer.serialize(COUNTRIES.filter(country => country.planet.id === planetId));
    response.send({ ...countries, meta:{ count: countries.data.length }});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
