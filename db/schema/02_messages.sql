DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  buyer_id INTEGER REFERENCES users(id),
  seller_id INTEGER REFERENCES users(id),
  listing_id INTEGER REFERENCES listings(id),
  subject VARCHAR(255) NOT NULL,
  message TEXT
);
