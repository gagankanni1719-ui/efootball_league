-- Paste this completely into the Supabase SQL Editor and hit "Run"

-- 0. If you already have the table, run this block once to add the new columns:
/*
ALTER TABLE players 
ADD COLUMN "matchesWon" INTEGER DEFAULT 0,
ADD COLUMN "matchesLost" INTEGER DEFAULT 0,
ADD COLUMN "matchesDrawn" INTEGER DEFAULT 0;
*/

-- 0.5. To add the new Badge tracking columns to your existing table, run this:
/*
ALTER TABLE players 
ADD COLUMN "winStreak" INTEGER DEFAULT 0,
ADD COLUMN "goalsAgainst" INTEGER DEFAULT 0;
*/

-- 1. Create the players table (If starting fresh)
CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  goals INTEGER DEFAULT 0,
  "leaguesWon" INTEGER DEFAULT 0,
  "matchesWon" INTEGER DEFAULT 0,
  "matchesLost" INTEGER DEFAULT 0,
  "matchesDrawn" INTEGER DEFAULT 0,
  "winStreak" INTEGER DEFAULT 0,
  "goalsAgainst" INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  flag TEXT DEFAULT '🌍'
);

-- 2. Turn on Realtime for the players table
-- alter publication supabase_realtime add table players; -- Run this if not already done

-- 3. Insert the default players (only if table is empty)
INSERT INTO players (id, username, password, name, goals, "leaguesWon", "matchesWon", "matchesLost", "matchesDrawn", "winStreak", "goalsAgainst", image, flag)
VALUES 
  ('1', 'Shubham Hande', 'password', 'Shubham Hande', 0, 0, 0, 0, 0, 0, 0, 'https://ui-avatars.com/api/?name=Shubham+Hande&background=1e293b&color=fff&size=150', '🌍'),
  ('2', 'Gagan Kanni', 'password', 'Gagan Kanni', 0, 0, 0, 0, 0, 0, 0, 'https://ui-avatars.com/api/?name=Gagan+Kanni&background=1e293b&color=fff&size=150', '🌍'),
  ('3', 'Sudeep Hilli', 'password', 'Sudeep Hilli', 0, 0, 0, 0, 0, 0, 0, 'https://ui-avatars.com/api/?name=Sudeep+Hilli&background=1e293b&color=fff&size=150', '🌍'),
  ('4', 'Prajwal Kasture', 'password', 'Prajwal Kasture', 0, 0, 0, 0, 0, 0, 0, 'https://ui-avatars.com/api/?name=Prajwal+Kasture&background=1e293b&color=fff&size=150', '🌍'),
  ('5', 'Anil Hilli', 'password', 'Anil Hilli', 0, 0, 0, 0, 0, 0, 0, 'https://ui-avatars.com/api/?name=Anil+Hilli&background=1e293b&color=fff&size=150', '🌍')
ON CONFLICT (id) DO NOTHING;
