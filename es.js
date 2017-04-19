var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'http://35.184.66.182:9200',
  log: 'info'
});

var index_data = function (_index, _type, _id, message) {
  client.index({
    index: _index,
    type: _type,
    id: _id,
    body: message
  }, function (error, response) {
    console.log(error || response);
  });
}


exports.index_data = index_data;