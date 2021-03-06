const connection = require('../config/connection.js');

//create an array of question marks
printQuestionMarks = num => {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push(`?`);
    }

    return arr.toString();
}


// Helper function to convert object key/value pairs to SQL syntax
objToSql = ob => {

    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
      // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {

        if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = `'${value}'`;
        }

        arr.push(`${key} = ${value}`);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();

}

var orm = {
    
    all: function(tableInput, cb){
        var queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    
    create: function(table, cols, vals, cb){
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, res) {
            if (err) {
                throw err;
            }

            cb(res);
        });
    },
    
    update: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, res) {
            if (err) {
            throw err;
        }
        cb(res);
        });
    },
    delete: function(table, condition, cb){
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
        if (err) {
        throw err;
        }

        cb(result);
        });
    }
};

//export the object for the model
module.exports = orm;