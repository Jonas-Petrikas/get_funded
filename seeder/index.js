console.log('start seeding');

import { faker } from '@faker-js/faker';
import { createUser } from './users.js';
import mysql from 'mysql';
import { createProjects } from './projects.js';


const usersCount = 100;
const projectsCount = 14;


const users = faker.helpers.multiple(createUser, { count: usersCount });

const projects = faker.helpers.multiple(createProjects, { count: projectsCount });

projects.forEach(project => {
    project.user_id = faker.number.int({ min: 1, max: usersCount });
})


console.log(projects);

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'get_funded'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

let sql = '';
sql = 'DROP TABLE IF EXISTS projects;';

con.query(sql, (err) => {
    if (err) {
        console.log('projects table dropping fail', err)
    } else {
        console.log('projects table dropping success')
    }
});

sql = 'DROP TABLE IF EXISTS users;';

con.query(sql, (err) => {
    if (err) {
        console.log('users table dropping fail', err)
    } else {
        console.log('users table dropping success')
    }
});

sql = `
CREATE TABLE users (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL UNIQUE,
    password char(32) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    role enum('admin','user','powered') NOT NULL DEFAULT 'user'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

con.query(sql, (err) => {
    if (err) {
        console.log('users table create fail', err)
    } else {
        console.log('users table create success')
    }
});

sql = `
CREATE TABLE projects (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title text NOT NULL,
    content text NOT NULL,
    user_id int(10) UNSIGNED DEFAULT NULL,
    image text NOT NULL,
    amount_goal int(11) UNSIGNED NOT NULL,
    amount_collected int(11) UNSIGNED NOT NULL,
    created_at date NOT NULL DEFAULT current_timestamp(),
    updated_at date NOT NULL DEFAULT current_timestamp(),
    status enum('to_review','approved','disapproved', 'done') NOT NULL DEFAULT 'to_review'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

con.query(sql, (err) => {
    if (err) {
        console.log('projects table create fail', err)
    } else {
        console.log('projects table create success')
    }
});

sql = `
    INSERT INTO users
    (name, password, email, role)
    VALUES ?
`;
con.query(sql, [users.map(user => [user.name, user.password, user.email, user.role])], (err) => {
    if (err) {
        console.log('Users table seed error', err)
    } else {
        console.log('Users table was seeded')
    }
});

sql = `
    INSERT INTO projects
    (title, content, user_id, image, amount_goal, amount_collected, created_at, updated_at, status)
    VALUES ?
`;
con.query(sql, [projects.map(project => [project.title, project.content, project.user_id, project.image, project.amount_goal, project.amount_collected, project.created_at, project.updated_at, project.status])], (err) => {
    if (err) {
        console.log('projects table seed error', err)
    } else {
        console.log('projects table was seeded')
    }
});


con.end();