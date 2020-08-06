const orm = require("../config/orm.js");

var burger = {
    selectAll: (cb) => {
        orm.all("burgers", res => {
            cb(res);
        });
    },

    insertOne: (cols, vals, cb) => {
        orm.create("burgers", cols, vals, res => {
            cb(res);
        });
    },

    updateOne: (objColVals, condition, cb) => {
        orm.update("burgers", objColVals, condition, res => {
            cb(res);
        });
    },

    deleteOne: (condition, cb) => {
        orm.delete("burgers", condition, res => {
            cb(res);
        });
    }
};

  // Export the database functions for the controller.
module.exports = burger;