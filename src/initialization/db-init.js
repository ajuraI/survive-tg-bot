const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('surviveDB');
const { tables, VALUE } = require('../constants');
let baseData = {};

db.serialize(() => {
    for (let key in tables) {
        const query = `SELECT * FROM \`${tables[key]}\``
        db.all(query, (err, rows) => {
            baseData[key] = rows.reduce((acc, cur) => {
                acc.push(cur[VALUE])
                return acc;
            }, []);
        })
    }
});
db.close();

module.exports = baseData;

