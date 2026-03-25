-- Add deleted column if missing
SET @col_deleted := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'users'
    AND column_name = 'deleted'
);

SET @sql_deleted := IF(@col_deleted = 0,
  'ALTER TABLE users ADD COLUMN deleted TINYINT(1) NOT NULL DEFAULT 0',
  'SELECT 1'
);

PREPARE stmt1 FROM @sql_deleted;
EXECUTE stmt1;
DEALLOCATE PREPARE stmt1;


-- Add deleted_at column if missing
SET @col_deleted_at := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'users'
    AND column_name = 'deleted_at'
);

SET @sql_deleted_at := IF(@col_deleted_at = 0,
  'ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL',
  'SELECT 1'
);

PREPARE stmt2 FROM @sql_deleted_at;
EXECUTE stmt2;
DEALLOCATE PREPARE stmt2;