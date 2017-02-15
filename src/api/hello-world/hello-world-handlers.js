'use strict' ; 

function getHelloWorld (request, reply) {
	 reply('Hello World ' + JSON.stringify(request.auth.credentials));
}

exports.getHelloWorld = getHelloWorld;

