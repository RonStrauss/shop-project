const swaggerAutogen = require('swagger-autogen')();

const endpointFilesArray = [];
const fs = require('fs');

fs.readdirSync('./Routes/').forEach(file => {
	endpointFilesArray.push(`./Routes/${file}`);
});

const outputFile = './swagger_output.json';
(async () => {
	await swaggerAutogen(outputFile, endpointFilesArray);
	require('./index');
})();
