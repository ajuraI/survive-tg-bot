const sqlite3 = require('sqlite3').verbose();
const { tables, VALUE } = require('../constants');
const { state } = require('./state');

const initDB = () => {
    const db = new sqlite3.Database('surviveDB.db');
    db.serialize(() => {
        /** Парсинг основной информации из бд */
        for (let key in tables) {
            const query = `SELECT * FROM \`${key}\``
            db.all(query, (err, rows) => {
                state.baseData[key] = rows.reduce((acc, cur) => {
                    acc.push(cur[VALUE])
                    return acc;
                }, []);
                state.data[key] = state.baseData[key];
            })
        }
        /** Парсинг спец условий */
        const query = `SELECT * FROM \`special_conditions*\``
        db.all(query, (err, rows) => {
            state.specialConditions = rows.reduce((acc, cur) => {
                acc.push(cur[VALUE])
                return acc;
            }, []);
        })
    });
    db.close();
}

module.exports = { initDB };

