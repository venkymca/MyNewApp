'use strict';

var Handlers = require('./hello-world-handlers.js');
var routes = new Array();
var Joi = require('joi');
exports.register = function (server, options, next) {
   routes.forEach(route => { server.route(route); });
   next();
};
//exports.register = function (server, options, next) {
     //try { // Ignore error if strategy is registered already
       //     server.auth.strategy('clientCert', 'client-cert'); // Register new authentication strategy 'clientCert'
       // } catch (e) {};
//};
        // Rest of route registration
exports.register.attributes = require('./package');

routes.push({
    method: 'GET',
    path: '/hello-world',
    config: {
	//auth: 'clientCert',
       plugins: {
    'hapi-swagger': {
		validate: {
        params: {
            username: Joi.string()
                .required('ABC')
                .description('Define a valid user name')
                .example('Mary')
        }
    },		
        responses: {
            '200': {
                'description': 'Success',
                'schema': Joi.string().required().description('status').example('Success')
            },
            '400': {
                'description': 'Bad Request',
                'schema': Joi.object({code: Joi.number(),msg: Joi.string()}).label('Error')
            },
            '500': {
                'description': 'Internal Server Error',
                'schema': Joi.object({code: Joi.number(),msg: Joi.string()}).label('Error')
            }
        }
    }
}
	  // description: 'Hello World NewApi',
       // notes: 'Test Notes',
       // tags: ["api"]
    },
    handler: Handlers.getHelloWorld
});

