const connection = require('/connection.js');

var orm = {
    
    selectAll: function selectAll(table, bd){
        var query = "SELECT * FROM " + table + ";";
        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            bd(res);
        });
    },
    
    insertOne: function insertOne(table, cols, vals, bd){
        var query = "INSERT INTO " + table;

        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";

        console.log(query);

        connection.query(queryString, vals, function(err, res) {
            if (err) {
                throw err;
            }

            db(res);
        });
    },
    
    updateOne: function updateOne(table, objColVals, condition, bd){
        var query = "UPDATE " + table;

        query += " SET ";
        query += objToSql(objColVals);
        query += " WHERE ";
        query += condition;
    
        console.log(query);
        connection.query(query, function(err, res) {
            if (err) {
            throw err;
        }
        
        bd(res);
        });
    }
};

module.exports(orm.js)