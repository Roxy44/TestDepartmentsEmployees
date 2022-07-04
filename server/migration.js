const mysql = require("mysql");
const migration = require("mysql-migrations");

const connectionConfig = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'depempdb'
});

migration.init(connectionConfig, __dirname + '/database');