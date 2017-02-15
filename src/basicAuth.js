'use strict'

const BasicAuth = require('hapi-auth-basic'); // Basic authentication scheme

function basicValidateFunc(request, username, password, callback) {
    // Build a simple credentials object
    let credentials = {
        sub: username // simply extract username from basic authentication header without any validation
    };

    callback(null, true, credentials); // (err, isValid, credentials)
}

exports.register = (server, options, next) => {
    // Register basic authentication authentication scheme and register new strategy based on it
    server.register(BasicAuth, err => {
        server.auth.strategy('basic', 'basic', { validateFunc: basicValidateFunc }); 
        next();
    });
}

exports.register.attributes = {
    name: 'my-basic-auth'
}