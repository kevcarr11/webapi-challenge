exports.seed = function(knex, Promise) {
  return knex('projects').insert([
    {
      name: 'Edit this project to start your list!',
      description:
        'Write a brief description about your project!',
    },
  ]);
};
