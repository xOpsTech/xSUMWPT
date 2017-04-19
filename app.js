var es = require('./es');

var WebPagetest = require('webpagetest');
var wpt = new WebPagetest('http://35.184.66.182/', '99');  //server, api_key

var urlToTest = "https://news.google.com/";
var urlToTestYahoo = "https://www.yahoo.com/news/";


function runTest() {
  var options = { firstViewOnly: true, runs: 1, pollResults: 5, timeout: "120" }
  wpt.runTest(urlToTestYahoo, options, function (err, res) {
    // console.log(err || 'First Paint: ' + res.data.median.firstView.firstPaint);
    if (!res) {
      console.log(err);
      return;
    }
    test_id = res.data.id;
    console.log(`retrieved data for test id: ${test_id}`);
    var result = res.data.median.firstView;
    // ['pages', 'rawData', 'requests', 'breakdown', 'domains', 'images', 'testTiming', 'thumbnails', 'userTimes', 'userTimingMeasures', 'consoleLog'].
    //   forEach(k => delete result[k]);

    var message = {};
    var requiredMetrics = ['URL', 'loadTime', 'TTFB', 'render', 'fullyLoaded', 'docTime', 'image_total', 'domElements', 'firstPaint', 'isResponsive', 'SpeedIndex', 'date', 'userTime', 'firstPaint']
    requiredMetrics.map(function (k) {
      message[k] = result[k];
    });
    // console.log(message);
    message['storedTimestamp'] = new Date().toISOString();
    message['date'] = new Date(message['date'] * 1000);
    es.index_data('metrics', 'metrics', test_id, message);
  });
}

setInterval(runTest, 2 * 60 * 1000);