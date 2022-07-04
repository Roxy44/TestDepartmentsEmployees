module.exports = {
    "up": "CREATE TABLE departments (department_id INT NOT NULL, UNIQUE KEY department_id (department_id), name VARCHAR(20), description VARCHAR(200), createdAt TIMESTAMP NOT NULL DEFAULT NOW(), updatedAt TIMESTAMP NOT NULL DEFAULT NOW())",
    "down": "DROP TABLE departments"
}