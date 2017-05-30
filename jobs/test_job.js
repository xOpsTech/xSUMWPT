"use strict";

const wpt = require('../config/wpt_connection.js');
const Test = require('../models/test.js');
const TestResult = require('../models/test_result.js');

module.exports = function (agenda) {
  // agenda.define('registration email', function (job, done) {
  //   User.get(job.attrs.data.userId, function (err, user) {
  //     if (err) return done(err);
  //     email(user.email(), 'Thanks for registering', 'Thanks for registering ' + user.name(), done);
  //   });
  // });

  // agenda.define('run test', function (job, done) {
  //   let projectId = job.attrs.data.result.projectId;
  //   let testData = job.attrs.data.result.testData;
  //   console.log('job is defined for', projectId);
  //   wpt.runTest(testData.toTest, testData, function (err, res) {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     let test_id = res.data.id;
  //     console.log(`retrieved data for test id: ${test_id}`);
  //     let testResult = new TestResult(res);
  //     testResult.save(projectId);
  //   })
  // });

  agenda.define('run test', function (job, done) {
    let projectId = job.attrs.data.result.projectId;
    let testData = job.attrs.data.result.testData;
    console.log('job is defined for', projectId);

    let testObject = new Test(testData);
    testObject.runTest(function (err, res) {
      if (err) {
        console.log(err);
        return;
      }
      let test_id = res.data.id;
      console.log(`retrieved data for test id: ${test_id}`);
      let testResult = new TestResult(res);
      testResult.save(projectId);
    });

  });


  // More email related jobs
}