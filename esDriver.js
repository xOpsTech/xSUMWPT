"use strict";

const client = require('./config/es_connection.js');

var _index_data = function (_index, _type, _id, message) {
  client.index({
    index: _index,
    type: _type,
    id: _id,
    body: message
  }, function (error, response) {
    console.log(error || response);
  });
};

var _read_data = function (_index, _type, query, callback) {
  client.search({
    index: _index,
    type: _type,
    body: query
  }).then(function (resp) {
    var hits = resp.hits.hits;        
    callback(hits);
  }, function (err) {
    console.trace(err.message);
    callback(err);
  });
};


module.exports = {
  addProject: function (projectObj) {
    var userId = projectObj.userId;
    _index_data('user', 'project', userId, projectObj);
  },
  medianMetric: function (callback) {
    var query = { query: { range: { storedTimestamp: { gte: "now-1h" } } }, size: 100 };
     _read_data('wpt', 'median_metrics', query, callback);
    
  }
}