"use strict";

var esDriver = require('../esDriver.js');
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    var projectObj = req.body;
    esDriver.addProject(projectObj);
    return res.status(201).json({
        message: "success",
        error: false
    });
});


// export this router to use in app.js
module.exports = router;