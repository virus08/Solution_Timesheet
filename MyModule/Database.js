
const mysqlx = require('@mysql/xdevapi');

require('dotenv').config(); 
exports.CreateES = async function () {
  const sectionRW = await mysqlx.getSession({ 
    user: process.env.DBACCOUNT,
    host: process.env.DBHOST,
    port: process.env.DBPORTRW },
    { pooling: { enabled: process.env.ENABLEPOOL , maxSize: process.env.DBPOOLSIZE } 
  });

  const schema =  sectionRW.getSchema(process.env.DBSCHEMA);
  if (!(await schema.existsInDatabase())){
    await sectionRW.createSchema(process.env.DBSCHEMA)
        .then(console.log('Schema \"'+ process.env.DBSCHEMA +'\" created'));
  } else {
    console.log('Schema \"'+ process.env.DBSCHEMA +'\" is exist')
    await sectionRW.dropSchema(process.env.DBSCHEMA)
      .then(async function (){
        console.log('Schema \"'+ process.env.DBSCHEMA +'\" is droped')
        await sectionRW.createSchema(process.env.DBSCHEMA)
          .then(console.log('Schema \"'+ process.env.DBSCHEMA +'\" recreated'));
      });
  }
  await sectionRW.sql('USE '+process.env.DBSCHEMA ).execute();
  
  await sectionRW.sql(`           
        CREATE TABLE IF NOT EXISTS brands (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name varchar(100),
        status tinyint(1) NOT NULL DEFAULT '1',
        modify_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (name),
        PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8MB4;
    `).execute()
    .then(
        console.log('Create Table brands')
  );

  await sectionRW.sql(`           
        CREATE TABLE IF NOT EXISTS tasktype (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name varchar(100),
        status tinyint(1) NOT NULL DEFAULT '1',
        modify_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (name),
        PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8MB4;
    `).execute()
    .then(
        console.log('Create Table tasktype')
  );

  await sectionRW.sql(`           
        CREATE TABLE IF NOT EXISTS task (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name varchar(100),
        description varchar(100),
        type tinyint(1) NOT NULL DEFAULT '1',
        status tinyint(1) NOT NULL DEFAULT '1',
        modify_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (name),
        PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8MB4;
    `).execute()
    .then(
        console.log('Create Table project')
  );

  await sectionRW.sql(`           
        CREATE TABLE IF NOT EXISTS project (
        id MEDIUMINT NOT NULL AUTO_INCREMENT,
        name varchar(100),
        description varchar(100),
        type tinyint(1) NOT NULL DEFAULT '1',
        status tinyint(1) NOT NULL DEFAULT '1',
        modify_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (name),
        PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8MB4;
    `).execute()
    .then(
        console.log('Create Table project')
  );

  sectionRW.close()
    .then(function (){
      console.log('Connection Closed');
      return(0);
  });
};