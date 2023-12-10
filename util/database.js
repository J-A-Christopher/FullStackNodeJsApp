const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '37936845', {dialect:'mysql', host:'localhost'});

module.exports = sequelize;


// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database: 'node',
//     password:'37936845'
// });

// module.exports= pool.promise();