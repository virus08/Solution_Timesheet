import http from "http";
import app from "./app";
require('dotenv').config(); 
//Use system configuration for port or use 6001 by default.
const port = process.env.APPPORT || 8000;

//Create server with exported express app
const server = http.createServer(app);
server.listen(port);
console.log('Listening on http://'+process.env.APPNAME+':'+process.env.APPPORT)