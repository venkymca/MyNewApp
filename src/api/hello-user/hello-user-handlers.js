'use strict' ; 

function getHelloUser (request, reply) {
	reply('Hello '+(request.auth.credentials ? request.auth.credentials.sub : request.params.username));
}

exports.getHelloUser = getHelloUser;

