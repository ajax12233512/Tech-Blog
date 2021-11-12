const User = require('../models/User');

const userData = [
    {
        username: 'neilj1213',
        password: 4321
    },
    {
        username: 'jon123',
        password: 1234
    },
    {
        username: 'chris123',
        password: 4312
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;