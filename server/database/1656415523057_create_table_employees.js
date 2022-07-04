module.exports = {
    "up": "CREATE TABLE employees (user_id INT NOT NULL, UNIQUE KEY user_id (user_id), first_name VARCHAR(20), last_name VARCHAR(20), department_id INT NOT NULL, createdAt TIMESTAMP NOT NULL DEFAULT NOW(), updatedAt TIMESTAMP NOT NULL DEFAULT NOW())",
    "down": "DROP TABLE employees"
}