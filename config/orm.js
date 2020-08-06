const connection = require('../config/connection.js');

const printQuestionMarks = num => {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(`?`);
    }

    return arr.toString();
}


// Helper function to convert object key/value pairs to SQL syntax
const objToSql = ob => {

    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
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
    
    all: function all(table, cb){
        var queryString = `SELECT * FROM ${table};`;
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    
    create: function create(table, cols, vals, cb){
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
    
    update: function updateOne(table, objColVals, condition, cb){
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
    delete: (table, condition, cb) => {
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

module.exports = orm;