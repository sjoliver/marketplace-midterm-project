DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  buyer_id INTEGER REFERENCES users(id),
  listing_id INTEGER REFERENCES users(id),
  selling_price INTEGER NOT NULL DEFAULT 0,
  date_sold DATE NOT NULL
);
