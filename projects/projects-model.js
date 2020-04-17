const dB = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    add,
    findTasks,
    addTask
    //list of helper functions
}

//helper functions go here

function find(){
    return dB('projects')
}

function findById(id){
    return dB('projects')
    .where({ id })
    .first()
}

function add(project){
    return dB('projects')
    .insert(project, 'id')
    .then(([id])=>{
        return findById(id)
    })
    .catch(error=>{
        console.log('Error on add Project', error)
    })
}

function findTasks(project_id){
    return dB('tasks as t')
      .where({project_id})
      .join('projects as p', 't.project_id', 'p.id')
      .select('p.name as project', 'p.desc as project_desc', 't.desc as task_desc', 't.notes as task_notes', 't.finished as task_status')
      
}

function addTask(task, id){
    return dB('tasks')
      .insert(task, "id")
      .then(newTask=>{
          return newTask
      })
      .catch(error =>{
        console.log('Error on add Task', error)
      })
}