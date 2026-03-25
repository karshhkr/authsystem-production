-- Add indexes (fresh DB me duplicate ka issue nahi hoga)

CREATE INDEX idx_users_role ON users(role);
