'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable(
     'Collaborators',
     {
       createdAt: {
         allowNull: false,
         type: Sequelize.DATE,
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE,
       },
       UserId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE",
         primaryKey: true,
         allowNull: false,
         references: {
           model: "Users",
           key: "id",
         }
       },
       WikiId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE",
         primaryKey: true,
         allowNull: false,
         references: {
           model: "Wikis",
           key: "id"
         }
       }
     }
   );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('Collaborators');
  }
};
