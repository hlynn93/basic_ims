module.exports = {
  CREATE: {
    ITEM_TABLE: `CREATE TABLE IF NOT EXISTS [Item] (
        [id]   INTEGER PRIMARY KEY AUTOINCREMENT,
        [title] TEXT    NOT NULL,
        [quantity] REAL NOT NULL DEFAULT 0,
        [unit] TEXT NOT NULL,
        [price] INTEGER NOT NULL
      );`,
    TRANSACTION_TABLE: `CREATE TABLE IF NOT EXISTS [Transaction] (
        [id] INTEGER PRIMARY KEY AUTOINCREMENT,
        [itemId] INTEGER NOT NULL,
        [orderId] INTEGER,
        [price] INTEGER NOT NULL,
        [quantity] REAL NOT NULL,
        [timestamp] DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY([itemId]) REFERENCES [Item](id),
        FOREIGN KEY([orderId]) REFERENCES [Order](id)
      );`,
    ORDER_TABLE: `CREATE TABLE IF NOT EXISTS [Order] (
        [id]          INTEGER PRIMARY KEY AUTOINCREMENT,
        [timestamp] DATETIME DEFAULT CURRENT_TIMESTAMP
      );`
  },
  INSERT: {
    ITEM: (title = null,
      quantity = null,
      unit = null,
      price = null) => (
          `INSERT INTO [Item]
          (title, quantity, unit, price)
          VALUES ('${title}', ${quantity}, '${unit}', ${price});`
      )
  },
  SELECT: {
    TABLES: "SELECT name FROM sqlite_master WHERE type='table'"
  }
};

