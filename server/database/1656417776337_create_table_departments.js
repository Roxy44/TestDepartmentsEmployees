module.exports = {
    "up": "INSERT INTO departments VALUES (1, 'Marketing', 'Marketing description', NOW(), NOW()), (2, 'Support', 'Support description', NOW(), NOW()), (3, 'Accounting', 'Accounting description', NOW(), NOW()), (4, 'General', 'General description', NOW(), NOW()), (5, 'Administrative', 'Administrative description', NOW(), NOW())",
    "down": "DELETE FROM departments"
}
