'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Users', [
            {
                firstName: 'Noah',
                lastName: 'Lauffer',
                email: 'lauffern@gmail.com',
                password: 'password',
                gender: 'male',
            },
            {
                firstName: 'Steve',
                lastName: 'Lauffer',
                email: 'steve@gmail.com',
                password: 'password',
                gender: 'male',
            },
            {
                firstName: 'Luna',
                lastName: 'Young',
                email: 'luna@gmail.com',
                password: 'password',
                gender: 'female',
            },
            {
                firstName: 'Ashley',
                lastName: 'Young',
                email: 'Ash@gmail.com',
                password: 'password',
                gender: 'female',
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('Users', null, {})
    },
}
