const Connect = require('./Database');
const DB_RW = Connect.DBrw;
const DB_RO = Connect.DBro;

exports.initDatabase = async function () {
    const schema =  DB_RO.getSchema('ES');
    if (!(await schema.existsInDatabase())){
        await sectionRW.createSchema('ES')
            .then(console.log('Enterprise Schema Created'));
    }
    console.log('Database Prepare');
    return ('Done')
  };