const express = require("express");
const mysql = require("mysql");
const { Sequelize } = require("sequelize");
const { exec } = require('child_process');
const e = require("express");

const app = express();
app.use(express.json());
const server = require('http').Server(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
	if (err) {
		throw Error(err);
	}
	console.log(`Server started on port: ${PORT}`);
});

async function start() {

	exec("node migration.js refresh", (err, result) => {
		if (err)
			return err;
		console.log(result);
	});

	const sequelize = new Sequelize('depempdb', 'root', '', { 
		host: '127.0.0.1',
		dialect: 'mysql' 
	});

	const Employees = sequelize.define('employees', { 
		user_id: {
			type: Sequelize.NUMBER, 
			primaryKey: true
		}, 
		first_name: Sequelize.STRING(20).BINARY, 
		last_name: Sequelize.STRING(20).BINARY, 
		department_id: {
			type: Sequelize.NUMBER,
			unique: false,
		},
		createdAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.NOW,
			allowNull: false
		},
		updatedAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.NOW,
			allowNull: false
		}
	});

	const Departments = sequelize.define('departments', { 
		department_id: {
			type: Sequelize.NUMBER,
			primaryKey: true,
			allowNull: false
		}, 
		name: Sequelize.STRING(20).BINARY, 
		description: Sequelize.STRING(200).BINARY, 
		createdAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.NOW,
			allowNull: false
		},
		updatedAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.NOW,
			allowNull: false
		}
	});

	sequelize.sync() 

	app.post('/api/departments/get', (req, res) => {
			const { id } = req.body;
			Employees.findAll({where: {department_id: id}})
			.then((data) => res.send(data))
			.catch((err) => res.send(err));
    });

	app.get('/api/departments', (req, res) => {
		Departments.findAll()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	});

	app.post('/api/departments/create', async (req, res) => {
		const { name, description, id } = req.body;
		await Departments.create({
			department_id: id,
			name,
			description,
			createAt: Sequelize.NOW,
			updatedAt: Sequelize.NOW,
		})
		.then(() => {res.status(200).end()})
		.catch((err) => res.send(err));
	});

	app.post('/api/departments/update', async (req, res) => { 
		const { id, name, description } = req.body;
		await Departments.update({name, description}, {where: {department_id: id}})
		.then(() => {res.status(200).end()})
		.catch((err) => res.send(err));
	})

	app.post('/api/departments/delete', async (req, res) => {
		const { id } = req.body;
		await Departments.destroy({where: { department_id: id }})
		.then(() => {res.status(200).end()})
		.catch((err) => res.send(err));
	});

	app.get('/api/employees', (req, res) => {
		Employees.findAll()
		.then((data) => res.send(data))
		.catch((err) => res.send(err));
	});

	app.post('/api/employees/create', async (req, res) => {
		const { id, first_name, last_name, department_id } = req.body;
		await Employees.create({
			user_id: id,
			first_name,
			last_name,
			department_id,
			createAt: Sequelize.NOW,
			updatedAt: Sequelize.NOW,
		})
		.then(() => {res.status(200).end()})
		.catch((err) => res.send(err));
	});

	app.post('/api/employees/update', async (req, res) => { 
		const { id, first_name, last_name, department_id } = req.body;
		await Employees.update({first_name, last_name, department_id}, {where: {user_id: id}})
		.then(() => {res.status(200).end()})
		.catch((err) => res.send(err));
	})

	app.post('/api/employees/delete', async (req, res) => {
		const { id } = req.body;
		await Employees.destroy({where: { user_id: id }})
		.then(() => {res.status(200).end()})
		.catch((err) => res.send(err));
	});

}

start();

