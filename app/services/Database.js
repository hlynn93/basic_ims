import { config as CONFIG } from '../utils';

const sqlite3 = require('sqlite3').verbose();

class Database {

  constructor() {
    this.db = new sqlite3.Database(`${CONFIG.DB_PATH}${CONFIG.DB_NAME}`);
  }

  runAsync(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function cb(err) {
        if (err) {
          const responseObj = {
            error: err
          };
          reject(responseObj);
        } else {
          const responseObj = {
            statement: this
          };
          resolve(responseObj);
        }
      });
    });
  }

  allAsync(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function cb(err, rows) {
        if (err) {
          const responseObj = {
            error: err
          };
          reject(responseObj);
        } else {
          const responseObj = {
            rows
          };
          resolve(responseObj);
        }
      });
    });
  }

  init() {

  }

  testInit() {
    this.db.serialize(() => {
      this.db.run('CREATE TABLE lorem (info TEXT)');

      const stmt = this.db.prepare('INSERT INTO lorem VALUES (?)');
      for (let i = 0; i < 10; i += 1) {
        stmt.run(`Ipsum ${i}`);
      }
      stmt.finalize();

      this.db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
        console.log(`${row.id}: ${row.info}`);
      });
    });
  }

  createTable() {

  }

  getItems(value: string='') {
    return this.allAsync(`SELECT * FROM Item WHERE name LIKE '${value}%'`);
  }

  addItem() {

  }

  editItem() {

  }

  deleteItem() {

  }

  addTransaction() {

  }

  editTransaction() {

  }

  deleteTransaction() {

  }

  close() {
    this.db.close();
  }
}

export default Database;
