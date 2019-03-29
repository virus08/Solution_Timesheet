import mysql from "mysql";
require('dotenv').config(); 
const connectionstring = {
    connectionLimit : process.env.DBPOOLSIZE,
    host     : process.env.DBHOST,
    user     : process.env.DBACCOUNT,
    port     : process.env.DBPORTRW,
    password : process.env.DBPASS,
    database : process.env.DBSCHEMA,
    debug    : true 
    }
console.log(connectionstring);
const pool = mysql.createPool(connectionstring);

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