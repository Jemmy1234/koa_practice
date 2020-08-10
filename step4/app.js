const Sequelize = require('sequelize');
const config = require('./config');
const { Model } = require('sequelize');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});


// Define ORM
var Pet = sequelize.define('pets', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false
});

/*
// Create record
var now = Date.now();
(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Gaffey',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();



// Query record
(async() => {
    var pets = await Pet.findAll({
        where: {
            name:'Gaffey',
        }
    });
    console.log(`find ${pets.length} pets`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }
})();


// Updae record
/*
(async () => {
    let updatedValues = { gender: true, updatedAt: Date.now(), version: 1 };
    await Pet.update(updatedValues, { where: { name: 'Gaffey' } })
        .then((resule) => {
            console.log('updase success');
        });
})();
*/

// Delete record
/*
(async () => {
    await Pet.findByPk('d-1597025331967')
    .then((p) => {
        p.destroy();
        console.log("p destroy success");
    });
})();
*/


module.exports = sequelize;