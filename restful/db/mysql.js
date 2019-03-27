const mysqlx = require('@mysql/xdevapi');
require('dotenv').config(); 
const pool = mysqlx.createPool({
    connectionLimit : 10,
    user: process.env.DBACCOUNT,
    host: process.env.DBHOST,
    port: process.env.DBPORTRW,
    database : 'ES',
    debug    : false 
    });                    

function executeQuery(sql, callback) {
    pool.getConnection((err,connection) => {
        if(err) {
            return callback(err, null);
        } else {
            if(connection) {
                connection.query(sql, function (error, results, fields) {
                connection.release();
                if (error) {
                    return callback(error, null);
                } 
                return callback(null, results);
                });
            }
        }
    });
}

function query(sql, callback) {    
executeQuery(sql,function(err, data) {
if(err) {
    return callback(err);
}       
callback(null, data);
});
}

module.exports = {
query: query
}