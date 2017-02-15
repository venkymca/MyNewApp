'use strict';

// Load modules

const Hapi = require('hapi');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

var AddisonEngine = require('@hpe/addison-engine');

var server = null;

lab.experiment('Addison Engine setup', () => {
    lab.test("Set up Addison Engine server", function(done) {

        AddisonEngine.startAddisonServer((err, s) => {
            if (err) { throw err; }
            server = s;
            Code.expect(server).to.not.be.null();
            done();
        });
    });

    lab.test("Get swagger.json", function(done) {
        var options = {
            method: 'GET',
            url: '/swagger.json'
        };
        server.inject(options, function(response) {
            Code.expect(response.statusCode).to.equal(200);  
            Code.expect(response.payload).to.contain('"swagger"');  
            done();
        });
    });
});
lab.experiment('Application-specific tests', () => {
    lab.test('Hello World', function(done) {
        var options = {
            method: 'GET',
            url: '/hello-world'
        };
        server.inject(options, function(response) {
            Code.expect(response.statusCode).to.equal(200);  
            Code.expect(response.payload).to.contain('Hello');  
            done();
        });
    });
});
lab.experiment('Application-specific tests', () => {

});

