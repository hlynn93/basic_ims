CREATE TABLE Item (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT    NOT NULL,
  quantity REAL,
  unit TEXT NOT NULL,
  price INTEGER NOT NULL,
);

CREATE TABLE Transaction (
	id INTEGER PRIMARY KEY,
	price INTEGER,
	quantity REAL,
	CONSTRAINT Transaction_fk_itemId FOREIGN KEY (itemId)
    	REFERENCES Item (id) ON UPDATE CASCADE ON DELETE CASCADE,
)

CREATE INDEX Transaction_ix_itemId ON Post (itemId);

INSERT INTO Item (name, quantity, unit, price) VALUES ('Test', 10, 'bot', 300);
INSERT INTO Item (name, quantity, unit, price) VALUES ('Test2', 10, 'bot', 300);
INSERT INTO Item (name, quantity, unit, price) VALUES ('Test3', 10, 'bot', 300);
INSERT INTO Item (name, quantity, unit, price) VALUES ('Test4', 10, 'bot', 300);
