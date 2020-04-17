const dB = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    add
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