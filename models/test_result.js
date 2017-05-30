'use strict';

const es_client = require('../config/es_connection.js');
const wpt_helpers = require('../helpers/wpt_helpers.js');

class TestResult {

    constructor(resultData) {
        // this.testObject = options.testData;
        // this.index = options.projectId;
        this.result = resultData;
    }

    extractMedianMetrics(result) {
        return wpt_helpers.extractRequiredFields(result.data.median.firstView);
    }

    save(projectId) {
        es_client.index({
            index: projectId,
            type: "test_results",
            id: this.result.data.id,
            body: this.extractMedianMetrics(this.result)
        }, function (error, response) {
            console.log(error || response);
        });
    }
}

module.exports = TestResult;