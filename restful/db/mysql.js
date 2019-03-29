import mysql from "mysql";

require('dotenv').config(); 

const rwconnectionstring = {
    connectionLimit : process.env.DBPOOLSIZE,
    host     : process.env.DBHOST,
    user     : process.env.DBACCOUNT,
    port     : process.env.DBPORTRW,
    password : process.env.DBPASS,
    database : process.env.DBSCHEMA,
    debug    : true 
    }
const roconnectionstring = {
    connectionLimit : process.env.DBPOOLSIZE,
    host     : process.env.DBHOST,
    user     : process.env.DBACCOUNT,
    port     : process.env.DBPORTRO,
    password : process.env.DBPASS,
    database : process.env.DBSCHEMA,
    debug    : true 
    }

const poolro = mysql.createPool(roconnectionstring);
const poolrw = mysql.createPool(rwconnectionstring);


function executeQuery(sql, callback) {
    poolro.getConnection((err,connection) => {
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
function executeDML(sql, callback) {
    poolrw.getConnection((err,connection) => {
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
function dml(sql, callback) {    
    executeDML(sql,function(err, data) {
        if(err) {
            return callback(err);
        }       
        callback(null, data);
    });
}


module.exports = {
    query: query,
    dml: dml
}