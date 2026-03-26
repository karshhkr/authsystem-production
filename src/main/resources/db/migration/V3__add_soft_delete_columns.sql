-- Just in case extra audit columns chahiye
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login TIMESTAMP;