'use strict';

var AddisonEngine=require('@hpe/addison-engine');

//Start Addison engine server
AddisonEngine.startAddisonServer();

//Read environement specific config
// AddisonEngine.get('/level/console', (err, data)=>{
// 	if (err) {throw err;}
// 	console.log('configValue:' + data);
// })
