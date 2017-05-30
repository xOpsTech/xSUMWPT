"use strict";

const routes = require('express').Router();

routes.use('/project', require('./project.js'));
routes.use('/test', require('./test.js'));

module.exports = routes;