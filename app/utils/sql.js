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
        [orderId] INTEGER NOT NULL,
        [price] INTEGER NOT NULL,
        [quantity] REAL NOT NULL,
        FOREIGN KEY([itemId]) REFERENCES [Item](id),
        FOREIGN KEY([orderId]) REFERENCES [Order](id)
      );`,
    ORDER_TABLE: `CREATE TABLE IF NOT EXISTS [Order] (
        [id]          INTEGER PRIMARY KEY AUTOINCREMENT
      );`
  },
  INSERT: {
    ITEM: (title = null,
      quantity = null,
      unit = null,
      price = null) => {
        console.warn(title, quantity, unit, price);
        return (
          `INSERT INTO [Item]
          (title, quantity, unit, price)
          VALUES ('${title}', ${quantity}, '${unit}', ${price});`
        );
      }
  },
};

