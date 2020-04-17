
exports.up = function(knex) {
  return(knex.schema
    .createTable('projects', projects=>{
        projects.increments('id');
        projects.string('name', 64)
          .notNullable();
        projects.string('desc', 200);
        projects.boolean('finished')
          .defaultTo(false)
    })
    .createTable('resources', resources=>{
        resources.increments('id');
        resources.string('name', 64)
          .unique()
          .notNullable();
        resources.string('desc', 200);
    })
    .createTable('project_resources', proRes=>{
        proRes.increments('id');
        proRes.integer('project_id')
          .notNullable()
          .references('id')
          .inTable('projects')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
        proRes.integer('resource_id')
          .notNullable()
          .references('id')
          .inTable('resources')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
        proRes.unique(['project_id', 'resource_id']);
    })
    .createTable('tasks', tasks=>{
        tasks.increments('id');
        tasks.string('desc', 200)
          .notNullable();
        tasks.string('notes', 200)
        tasks.boolean('finished')
          .defaultTo(false);
        tasks.integer('project_id')
          .notNullable()
          .references('id')
          .inTable('projects')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
    })    
  )
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('project_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
