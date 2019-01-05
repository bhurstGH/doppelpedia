'use strict';
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();
const hashedPassword = bcrypt.hashSync("asdasd", salt);

let users = [];

users.push({
  username: "member",
  email: "member@member.com",
  password: hashedPassword,
  createdAt: new Date(),
  updatedAt: new Date(),
  role: "standard"
})
users.push({
 username: "admin",
 email: "admin@admin.com",
 password: hashedPassword,
 createdAt: new Date(),
 updatedAt: new Date(),
 role: "admin"
})
users.push({
 username: "premium",
 email: "premium@premium.com",
 password: hashedPassword,
 createdAt: new Date(),
 updatedAt: new Date(),
 role: "premium"
})

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
   return queryInterface.bulkInsert("Users", users, { returning: true });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkInsert("Users", null, {});
  }
};
