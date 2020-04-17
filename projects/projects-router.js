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

router.get('/:id/tasks', (req, res)=>{
    const { id } = req.params;

    Projects.findTasks(id)
      .then(tasks =>{
          if (tasks.length){
              res.status(200).json(tasks)
          } else{
              res.status(404).json({message: 'Could not find tasks for given scheme'})
          }
      })
      .catch(error=>{
          res.status(500).json({message: "Failed to pull steps from server"})
      })
})

router.post('/:id/tasks', (req, res)=>{
    const taskData = req.body;
    const { id } = req.params

    Projects.findById(id)
      .then(project =>{
          if(project){
              Projects.addTask(taskData, id)
                .then(task =>{
                    res.status(201).json(task)
                })
          }else{
              res.status(404).json({message: `Could not find a project with ID ${id}`})
          }
      })
      .catch(error=>{
          res.status(500).json({message: 'Failed to create new Task'})
      })
})

module.exports = router;