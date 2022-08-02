const sqlite3 = require('sqlite3').verbose();
const { tables, VALUE } = require('../constants');
const { state } = require('./state');
const db = new sqlite3.Database('surviveDB');

const initDB = () => {
    db.serialize(() => {
        for (let key in tables) {
            const query = `SELECT * FROM \`${tables[key]}\``
            db.all(query, (err, rows) => {
                state.baseData[key] = rows.reduce((acc, cur) => {
                    acc.push(cur[VALUE])
                    return acc;
                }, []);
                state.data = {...state.baseData};
            })
        }
    });
    db.close();
}

module.exports = { initDB };

