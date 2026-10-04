-- Step 1: Drop existing default constraint on is_deleted
ALTER TABLE users
ALTER COLUMN is_deleted DROP DEFAULT;

-- Step 2: Convert column type to boolean with explicit casting
ALTER TABLE users
ALTER COLUMN is_deleted TYPE boolean
USING (CASE WHEN is_deleted = 1 THEN TRUE ELSE FALSE END);

-- Step 3: Set new boolean default value and handle NULLs
ALTER TABLE users
ALTER COLUMN is_deleted SET DEFAULT false;

UPDATE users
SET is_deleted = false
WHERE is_deleted IS NULL;