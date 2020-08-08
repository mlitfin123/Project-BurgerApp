var mysql = require('mysql');
require('dotenv').config();

var connection;

if (process.env.JAWSDB_URL) {
    //database is on JawsDB
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    //database is local
    var connection = mysql.createConnection({
        multipleStatements: true, 
        host: "localhost",

        // Your port; if not 3306
        port: 3306,

        // Your username
        user: "root",

        // Your password
        password: "SoccerLiberty2006!",
        database: "burgers_db"

    });
}

    connection.connect(function(err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }
        console.log("connected as id " + connection.threadId);
        });

module.exports = connection;