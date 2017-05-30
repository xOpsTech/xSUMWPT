"use strict";

const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: 'http://35.184.66.182:9200',
    log: 'info'
});

module.exports = client;