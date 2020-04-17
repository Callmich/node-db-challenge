const dB = require('../data/db-config.js');

module.exports ={
    //list of helper functions
    find,
    findById,
    add
}

//helper functions go here

function find(){
    return dB('resources')
}

function findById(id){
    return dB('resources')
    .where({ id })
    .first()
}

function add(resource){
    return dB('resources')
    .insert(resource, 'id')
    .then(([id])=>{
        return findById(id)
    })
    .catch(error=>{
        console.log('Error on add Resource', error)
    })
}