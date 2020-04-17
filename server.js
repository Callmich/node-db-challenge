const express = require('express');

//creare Router for projects
const projectRouter = require('./projects/projects-router.js');
const resourceRouter = require('./resources/resources-router.js')

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);

module.exports = server;