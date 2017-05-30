"use strict";

var esDriver = require('../esDriver.js');
var agenda = require('../config/agenda.js');
const Test = require('../models/test.js');
const TestResult = require('../models/test_result.js');
var express = require('express');
var router = express.Router();

router.get('/result', function (req, res) {
    esDriver.medianMetric(function (resultJson) {
        res.json(resultJson);
    });
});

// router.post('/free_test', function (req, res) {
//     let testJson = req.body;  
//     testJson.freeTest = true;

//     let testObject = new Test(testJson);
//     let testResult = new TestResult({ projectId: 'free_project', testData: testObject });
//     agenda.now('run test', testResult);

//     });

// http://stackoverflow.com/questions/12806386/standard-json-api-response-format

router.post('/free_test', function (req, res) {
    let testJson = req.body;
    testJson.freeTest = true;

    let testObject = new Test(testJson);
    testObject.runTest(function (err, res) {
        if (err) {
            return res.status(404).json({
                message: JSON.stringify(err),
                error: true
            });
        }

    })

});

router.get('/result/:testId', function (req, res) {
    let testId = req.params.testId;
    Test.getResult(testId, function () {

    });

})

// router.post('/free_test', function (req, res) {
// let testJson = req.body;
// let userId = req.query.userId;
// let testId = req.query.testId;

// if (userId === 'free') {

//     let testObject = new Test(testJson);
//     let testResult = new TestResult({ userId: userId, testObject: testJson });
//     agenda.now('run test', testObject);

// }








// export this router to use in app.js
module.exports = router;