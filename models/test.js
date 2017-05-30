'use strict';

const wpt = require('../config/wpt_connection.js');

class Test {
    constructor(options) {
        this.freeTest = options.freeTest;
        this.firstViewOnly = true;
        this.pollResults = options.pollResults === undefined ? 5 : options.pollResults  // seconds
        this.timeout = 120  // seconds
        this.runs = 1;
        // this.location = options.locationId;
        this.testType = options.testType;
        this.testURI = options.testURI;
        this.toTest = this.testType === 'url' ? this.testURI : this.loadTestScript(this.testURI);

    }

    loadTestScript(uri) {
        return 'load script form uri';
    }

    runTest(cb) {
        wpt.runTest(this.toTest, this, function (err, res) {
            if (err) {
                console.log(err);
                cb(err, null);
            }
            cb(null, res);
        });
    }

    static getResult(testId, cb) {
        wpt.getTestResults(testId, function (err, res) {
            if (err) {
                console.log(err);
                cb(err, null);
            }
            cb(null, res);
        });
    }
}

module.exports = Test;

// const test = new Test({testType:'url', testURI: 'google'});
// console.log(test);