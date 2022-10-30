const express = require('express');

//Imports the configs 
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

//executing the function
start();

const port = 3000;

async function start() {
    const app = express();
    
    expressConfig(app);
    await databaseConfig();
    routesConfig(app);
    
    app.listen(port, () => `Server listening on port ${port}`)
    
}