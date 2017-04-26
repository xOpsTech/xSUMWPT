var es = require('./es');
var fs = require('fs');

var WebPagetest = require('webpagetest');
var wpt = new WebPagetest('http://35.184.66.182/', '99');  //server, api_key

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

  });
};


var testObjGoogle = {
  url: "https://news.google.com/",
  options: { firstViewOnly: true, runs: 1, pollResults: 5, timeout: "120" }
};

var testObjYahoo = {
  url: "https://www.yahoo.com/news/",
  options: { firstViewOnly: true, runs: 1, pollResults: 5, timeout: "120" }
};

runTest(testObjGoogle);
// setInterval(runTest, 1 * 60 * 1000);

setInterval(function (params) {
  runTest(testObjGoogle);
  runTest(testObjYahoo);
}, 1 * 60 * 1000);