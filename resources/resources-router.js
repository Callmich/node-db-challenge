const express = require('express');

const Resources = require('./resources-model.js')

const router = express.Router();

//CRUD actions will go here and will start with /api/resorces

router.get('/', (req, res)=>{
    Resources.find()
      .then(resources =>{
          res.status(200).json(resources)
      })
      .catch(error=>{
          res.status(500).json({message: `Server error while trying to pull resources ${error}`})
      })
})

router.post('/', (req, res)=>{
    const resourceData = req.body;

    Resources.add(resourceData)
      .then(resource =>{
          res.status(201).json(resource)
      })
      .catch(error=>{
          res.status(500).json({message: `Failed to create new resource due to ${error}`})
      })
})

module.exports = router;