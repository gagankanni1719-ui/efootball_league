-- Paste this completely into the Supabase SQL Editor and hit "Run"

-- 1. Create the players table
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  goals INTEGER DEFAULT 0,
  "leaguesWon" INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  flag TEXT DEFAULT '🌍'
);

-- 2. Turn on Realtime for the players table
alter publication supabase_realtime add table players;

-- 3. Insert the default players
INSERT INTO players (id, username, password, name, goals, "leaguesWon", image, flag)
VALUES 
  ('1', 'Shubham Hande', 'password', 'Shubham Hande', 0, 0, 'https://ui-avatars.com/api/?name=Shubham+Hande&background=1e293b&color=fff&size=150', '🌍'),
  ('2', 'Gagan Kanni', 'password', 'Gagan Kanni', 0, 0, 'https://ui-avatars.com/api/?name=Gagan+Kanni&background=1e293b&color=fff&size=150', '🌍'),
  ('3', 'Sudeep Hilli', 'password', 'Sudeep Hilli', 0, 0, 'https://ui-avatars.com/api/?name=Sudeep+Hilli&background=1e293b&color=fff&size=150', '🌍'),
  ('4', 'Prajwal Kasture', 'password', 'Prajwal Kasture', 0, 0, 'https://ui-avatars.com/api/?name=Prajwal+Kasture&background=1e293b&color=fff&size=150', '🌍'),
  ('5', 'Anil Hilli', 'password', 'Anil Hilli', 0, 0, 'https://ui-avatars.com/api/?name=Anil+Hilli&background=1e293b&color=fff&size=150', '🌍');
