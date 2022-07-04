module.exports = {
    "up": "INSERT INTO employees VALUES (1, 'Root', 'Admin', 1, NOW(), NOW()), (2, 'Dmitry', 'Developer', 1, NOW(), NOW())",
    "down": "DELETE FROM employees"
}