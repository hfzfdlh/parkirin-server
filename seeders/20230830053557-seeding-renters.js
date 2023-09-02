'use strict';

const { createPass } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = require('../data/renters.json').map(el=>{
      delete el.id
      el.password = createPass(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert('Renters',data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Renters',null,{})
  }
};
