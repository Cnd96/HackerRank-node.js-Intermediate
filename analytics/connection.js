const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const Analytics = require('./models/analytics');

return sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return Analytics.sync();
    })
    .then(result => {
        console.log(`Analytics table created`);
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })
