const mysqlx = require('@mysql/xdevapi');
// Connect to server on localhost
//var mySession = mysqlx.getSession()
(async function(){
    console.log('Database Prepare');
    const sectionRW = await mysqlx.getSession({ 
        user: 'root',
        host:'localhost',
        port:'64460' },
        { pooling: { enabled: true, maxSize: 10 } 
    });
    const sectionRO = await mysqlx.getSession({ 
        user: 'root',
        host:'localhost',
        port:'64470' },
        { pooling: { enabled: true, maxSize: 100 } 
    });
    const schema =  sectionRO.getSchema('ES');
    if (!(await schema.existsInDatabase())){
        await sectionRW.createSchema('ES')
            .then(console.log('Enterprise Schema Created'));
    }

    // const myDb = await section.getSchema('test');
    // await myDb.getCollection('section_NOSQL_RW',{ReuseExistingObject:true});
    await sectionRW.sql('USE ES').execute();
    await sectionRO.sql('USE ES').execute();
    await sectionRW.sql(`drop table if exists brands;`).execute();
    await sectionRW.sql(`           
        CREATE TABLE IF NOT EXISTS brands (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name varchar(100),
        status tinyint(1) NOT NULL DEFAULT '1',
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (name),
        PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8MB4;
    `).execute()
    .then(
        console.log('Create Table brands')
    );

} )();
