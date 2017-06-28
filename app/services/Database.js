import { config as CONFIG, sql as SQL } from '../utils';
import faker from 'faker';

const sqlite3 = require('sqlite3').verbose();

class Database {

  constructor() {
    this.db = new sqlite3.Database(`${CONFIG.DB_PATH}${CONFIG.DB_NAME}`);
  }

  serializeAsync(queries: []) {
    return new Promise(resolve => {
      this.db.serialize(() => {
        const statements = queries.map(query => this.db.prepare(query));
        statements.map(statement => statement.run());
      });
      resolve({ message: 'Database has been successfully updated' });
    });
  }

  runAsync(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
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
      this.db.all(sql, params, (err, rows) => {
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
    let queries = [];
    queries.push(SQL.CREATE.ITEM_TABLE);
    queries.push(SQL.CREATE.TRANSACTION_TABLE);
    queries.push(SQL.CREATE.ORDER_TABLE);
    return this.getItems()
    .then(result => {
      if (result.rows.length < 1) {
        queries = queries.concat(this.getTestItems());
      }
      return this.serializeAsync(queries);
    });
  }

  getTestItems() {
    const queries = [];
    for (let i = 0; i < 200; i += 1) {
      queries.push(SQL.INSERT.ITEM(
        faker.commerce.productName(),
        faker.random.number(),
        faker.name.prefix(),
        faker.commerce.price()
      ));
    }
    return queries;
  }

  createTable() {

  }

  getItems(value: string='') {
    return this.allAsync(`SELECT * FROM Item WHERE title LIKE '${value}%'`);
  }

  addItem() {

  }

  updateItem() {

  }

  deleteItem() {

  }

  addTransactions(transactions: []=[]) {
    const queries = transactions.map(transaction =>
      formatQuery('Transaction', Object.keys(transaction), Object.values(transaction), 'INSERT INTO')
    );
    return this.serializeAsync(queries);
  }

  addOrder() {
    return this.runAsync('INSERT INTO [Order] (id) VALUES (null)');
  }

  close() {
    this.db.close();
  }
}

// the entries of fields should be correctly indexed to the entries of values
const formatQuery = (table: string, fields: [], values: [], type: string) => (
  `${type} [${table}] (${fields.join(',')}) VALUES (${values.join(',')})`
);

export default Database;
