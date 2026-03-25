SET @col_exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'refresh_tokens'
    AND COLUMN_NAME = 'user_email'
);

SET @sql := IF(@col_exists > 0,
  'ALTER TABLE refresh_tokens DROP COLUMN user_email',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;