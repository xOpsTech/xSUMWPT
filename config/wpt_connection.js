"use strict";

var WebPagetest = require('webpagetest');
var wpt = WebPagetest('http://35.184.66.182/', '99');  //server, api_key

module.exports = wpt;