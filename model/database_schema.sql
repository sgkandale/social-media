-- postgres
-- users database
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- insert a user
INSERT INTO users (email, password) VALUES ('john@doe.com', '$2a$08$.QAOb2YteIAAtzjSQHVpPuM5oy4.w8bmEvXv4qd2nHfkCa9AFZG42');
INSERT INTO users (email, password) VALUES ('jane@doe.com', '$2a$08$KK0o9XTu9bpLBewKaUXpSOsgmis83EEh62Kvlycy1c7W51baJkmLi');

-- followers database
CREATE TABLE followers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  follower_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- insert followers
INSERT INTO followers (user_id, follower_id) VALUES (1, 2);

-- posts database
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  foreign key (user_id) references users(id) on delete cascade
);

-- likes to posts
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  foreign key (user_id) references users(id) on delete cascade,
  foreign key (post_id) references posts(id) on delete cascade
);

-- comments on posts
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  foreign key (user_id) references users(id) on delete cascade,
  foreign key (post_id) references posts(id) on delete cascade
);