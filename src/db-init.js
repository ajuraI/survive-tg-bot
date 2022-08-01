const sqlite3 = require('sqlite3').verbose();
module.exports = new sqlite3.Database('surviveDB');

// db.serialize(() => {
//     db.all("SELECT * FROM `Большой багаж`", (err, rows) => {
//         console.log(rows);
//     })
// });

// db.close();