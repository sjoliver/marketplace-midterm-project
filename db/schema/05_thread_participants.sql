DROP TABLE IF EXISTS thread_participants CASCADE;

CREATE TABLE thread_participants (
  thread_id INTEGER REFERENCES threads(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
