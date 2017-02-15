'use strict';

var Fs = require('fs');

// Definition of HPE Certificate Authorities
var HPECAs = require('@hpe/node-ssl-hpe-root-cas');

// Reuse test server certificate for "localhost" from Addison Engine or use our own file, e.g. stored in src/config
var myServerKey = Fs.readFileSync('./node_modules/@hpe/addison-engine/config/local/server.key', 'utf8');
var myServerCert = Fs.readFileSync('./node_modules/@hpe/addison-engine/config/local/server.crt', 'utf8');

// Exports config object
module.exports = {
    /*
     * Copy here any configuration you would like to keep from your .json
     * configuration file, but discard (or comment) any "connections" definition
     */
	  "registrations": [
        { "plugin" : {
            "register": "@hpe/hapi-auth-client-cert",
            "options": {}
        }}
    ],
    connections: [
        { // Simple TLS on port 8443
            host: 'localhost',
            port: 8443,
            "routes":{ "log": true },
            tls: {
                key: myServerKey,
                cert: myServerCert
            }
        },
        { // Mutual TLS on port 8444
            host: 'localhost',
            port: 8444,
            "routes":{ "log": true },
            tls: {
                key: myServerKey,
                cert: myServerCert,
                requestCert: true, // Asks for client certificate
                rejectUnauthorized: true, // client certificate is mandatory
                ca: HPECAs.All_HPE_CAs // Trust client certificates issued by HPE Certificate Authorities only
            }
        }
    ]
}