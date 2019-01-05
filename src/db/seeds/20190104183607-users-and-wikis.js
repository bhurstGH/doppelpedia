'use strict';
const faker = require("faker");

let users = [];

for (let i = 1; i <= 15; i++) {
  users.push({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    role: "standard"
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert("Users", users, { returning: true })
      .then((users) => {
        let wikis = [];
          let userIds = users.map(id => id.id);

          for (let i = 1; i <= 20; i++) {
            wikis.push({
              title: faker.hacker.noun(),
              body: faker.hacker.phrase(),
              userId: userIds[Math.floor(Math.random() * userIds.length)],
              createdAt: faker.date.past(),
              updatedAt: faker.date.recent()
            });
          }

          return queryInterface.bulkInsert("Wikis", wikis, { returning: true });
      })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Wikis", null, {})
    .then(() => {
      return queryInterface.bulkDelete("Users", null, {});
    })
  }
};
