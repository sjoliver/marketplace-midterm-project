DROP TABLE IF EXISTS threads CASCADE;

CREATE TABLE threads (
  id SERIAL PRIMARY KEY NOT NULL,
  subject VARCHAR(255) NOT NULL,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE
);