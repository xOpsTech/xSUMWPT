"use strict";

var Agenda = require('agenda');
var os = require('os');

var agendaName = os.hostname() + '-' + process.pid;
console.log(agendaName);
var connectionString = "127.0.0.1:27017/scheduled_jobs";
var config = { db: { address: connectionString, collection: 'jobs' }, name: agendaName };
var agenda = new Agenda(config);

require('../jobs/test_job.js')(agenda);

agenda.on('ready', function () {
    agenda.start();
});

module.exports = agenda;