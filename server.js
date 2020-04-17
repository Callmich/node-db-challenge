const express = require('express');

//creare Router for projects
const projectRouter = require('./projects/projects-router.js');

const server = express();

server.use(express.json());

server.use('/api/projects', projectRouter);

module.exports = server;