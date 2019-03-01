const fs = require('fs');

const express = require('express');

const app = express();

const path = require('path');

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

//  Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = 'prod';
const isProd = environment === 'prod';

const targetPath = `./dist/assets/data/appConfig.json`;
const envConfigFile = `
{
    "serviceUrl": "${process.env.SERVICE_URL}",
    "ottimizzaAPIComunicacaoURL": "${process.env.OTTIMIZZA_API_COMUNICACAO_URL}",
    "ottimizzaAPIComunicacaoServicesURL": "${process.env.OTTIMIZZA_API_COMUNICACAO_SERVICES_URL}",
    "ottimizzaWSComunicacaoURL": "${process.env.OTTIMIZZA_WS_COMUNICACAO_URL}",
    "ottimizzaWSComunicacaoServicesURL": "${process.env.OTTIMIZZA_WS_COMUNICACAO_SERVICES_URL}",
    "appRelease": "${process.env.COMMIT_HASH}"
}
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
        console.log('ERRO!\n' + err);
    }

    console.log(`Output generated at ${targetPath}-${process.env.SERVICE_URL}`);
});


app.use(express.static(__dirname + "/dist"));

app.listen(process.env.PORT || 8080);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});