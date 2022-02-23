-- postgres
-- users database
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- insert a user
INSERT INTO users (username, password) VALUES ('johndoe', '$2a$08$.QAOb2YteIAAtzjSQHVpPuM5oy4.w8bmEvXv4qd2nHfkCa9AFZG42');
INSERT INTO users (username, password) VALUES ('janedoe', '$2a$08$KK0o9XTu9bpLBewKaUXpSOsgmis83EEh62Kvlycy1c7W51baJkmLi');