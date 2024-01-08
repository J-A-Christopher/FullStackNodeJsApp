// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node', 'root', '37936845', {dialect:'mysql', host:'localhost'});

// module.exports = sequelize;


// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database: 'node',
//     password:'37936845'
// });

// module.exports= pool.promise();


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


let _db;
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://christopher:cjambetsa@cluster0.gxedhff.mongodb.net/shop?retryWrites=true&w=majority').then(client => {
        console.log('Connected');
        _db = client.db();
        callback();
    }).catch(err => {
        console.log(err);
        throw err;
    });
    
};

const getDb = ()=>{
    if (_db) {
        return _db;
        
    }
    throw 'No database found';
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

