const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

//CRUD actions go here and will start with /api/projects

router.get('/', (req, res)=>{
    Projects.find()
    .then(projects =>{
        res.status(200).json(projects)
    })
    .catch(error=>{
        res.status(500).json({message: `Server error while trying to pull projects ${error}`})
    })
})

router.post('/', (req, res)=>{
    const projectData = req.body;

    Projects.add(projectData)
      .then(project =>{
          res.status(200).json(project)
      })
      .catch(error =>{
          res.status(500).json({message: `Failed to create new Project due to ${error}`})
      })
})

module.exports = router;