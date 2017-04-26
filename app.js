var es = require('./es');
var fs = require('fs');

var WebPagetest = require('webpagetest');
const wpt = new WebPagetest('http://35.184.66.182/', '99');  //server, api_key

const userId = "YWRtaW4=";
const projectId = "xops_123"

// wpt.runTest('https://twitter.com/marcelduran', function(err, data) {
//   console.log(err || data);
// });

function transformJSONResult(jsonMessage) {
  return JSON.parse(JSON.stringify(jsonMessage), function (k, v) {
    if (k.indexOf('.') > -1) {
      replaced = k.replace(/[. ]/g, '_');
      this[replaced] = v;
    } else {
      return v;
    }
  });
};


function runTest(testObject) {
  var urlToTest = testObject.url;
  var options = testObject.options;
  wpt.runTest(urlToTest, options, function (err, res) {
    if (!res) {
      console.log(err);
      return;
    }
    test_id = res.data.id;
    console.log(`retrieved data for test id: ${test_id}`);

    var transformedResult = transformJSONResult(res);

    // var obj = JSON.parse(JSON.stringify(res), function (k, v) {
    //   if (k.indexOf('.') > -1) {
    //     replaced = k.replace(/[. ]/g, '_');
    //     this[replaced] = v;

    //   } else {
    //     return v;
    //   }
    // });
    transformedResult['storedTimestamp'] = new Date().valueOf();
    es.index_data('metrics', 'all', test_id, transformedResult);
    es.index_data('user', 'tests', test_id, { userId: userId, projectId: projectId, testId: test_id });

  });
};


var testObjGoogleF = {
  url: "https://news.google.com/",
  options: { firstViewOnly: true, runs: 1, pollResults: 5, timeout: "120", location: "us_central1_f" }
};

var testObjGoogleC = {
  url: "https://news.google.com/",
  options: { firstViewOnly: true, runs: 1, pollResults: 5, timeout: "120", location: "us_central1_c" }
};

var testObjYahooF = {
  url: "https://www.yahoo.com/news/",
  options: { firstViewOnly: true, runs: 1, pollResults: 5, timeout: "120", location: "us_central1_f" }
};

var testObjYahooC = {
  url: "https://www.yahoo.com/news/",
  options: { firstViewOnly: true, runs: 1, pollResults: 5, timeout: "120", location: "us_central1_c" }
};

runTest(testObjGoogleF);
// setInterval(runTest, 1 * 60 * 1000);

// setInterval(function (params) {
//   runTest(testObjGoogleF);
//   runTest(testObjGoogleC);
//   runTest(testObjYahooF);
//   runTest(testObjYahooC);
// }, 1 * 60 * 1000);