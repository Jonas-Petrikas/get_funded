console.log('start seeding');

import { faker } from '@faker-js/faker';
import { createUser } from './user.js';
import mysql from 'mysql';
import { createProject } from './project.js';


const usersCount = 100;
const projectsCount = 25;



const users = faker.helpers.multiple(createUser, { count: usersCount });

const projects = faker.helpers.multiple(createProject, { count: projectsCount });

const donations = [];

projects.forEach((project, i) => {
    project.user_id = faker.number.int({ min: 1, max: usersCount });

    const donationsCount = faker.number.int({ min: 0, max: 10 })
    let totalProjectDonation = 0;


    if (project.status === 'approved') {
        for (let j = 0; j < donationsCount; j++) {
            const donationAmount = faker.number.int({ min: 1, max: (project.amount_goal / 10) });
            if (project.amount_collected + donationAmount < project.amount_goal) {
                donations.push(
                    {
                        project_id: i + 1,
                        amount: project.amount_collected + donationAmount,
                        donated_at: faker.date.between({ from: project.created_at, to: new Date() }),
                        user_id: faker.number.int({ min: 1, max: usersCount })
                    })
                totalProjectDonation = (totalProjectDonation + donationAmount);
            }
        }
    } else if (project.status === 'done') {
        totalProjectDonation = project.amount_goal;
    }

    project.amount_collected = totalProjectDonation;

})


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

sql = 'DROP TABLE IF EXISTS sessions;';

con.query(sql, (err) => {
    if (err) {
        console.log('Sessions table dropping fail', err)
    } else {
        console.log('Sessions table dropping success')
    }
});

sql = 'DROP TABLE IF EXISTS donations;';

con.query(sql, (err) => {
    if (err) {
        console.log('Donations table dropping fail', err)
    } else {
        console.log('Donations table dropping success')
    }
});

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
CREATE TABLE donations (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_id int(10) UNSIGNED NOT NULL,
  amount mediumint(7) UNSIGNED NOT NULL,
  donated_at date NOT NULL DEFAULT current_timestamp(),
  user_id int(10) UNSIGNED DEFAULT NULL,
  custom_name char(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

con.query(sql, (err) => {
    if (err) {
        console.log('Donations table create fail', err)
    } else {
        console.log('Donations table create success')
    }
});

sql = `CREATE TABLE sessions (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int(10) UNSIGNED NOT NULL,
  token char(32) NOT NULL,
  valid_until date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`;
con.query(sql, (err) => {
    if (err) {
        console.log('Sessions table create fail', err)
    } else {
        console.log('Sessions table create success')
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

sql = `
    INSERT INTO donations
    (project_id, amount, donated_at, user_id)
    VALUES ?
`;

con.query(sql, [donations.map(donation => [donation.project_id, donation.amount, donation.donated_at, donation.user_id])], (err) => {
    if (err) {
        console.log('Donations table seed error', err)
    } else {
        console.log('Donations table was seeded')
    }
});

sql = `
ALTER TABLE donations
  ADD CONSTRAINT donations_ibfk_1 FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
  ADD CONSTRAINT donations_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;
`
con.query(sql, (err) => {
    if (err) {
        console.log('Donations table alter error', err);
    } else {
        console.log('Donations table was altered');
    }
});

sql = `
ALTER TABLE projects
  ADD CONSTRAINT projects_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;
`;

con.query(sql, (err) => {
    if (err) {
        console.log('projects table alter error', err);
    } else {
        console.log('projects table was altered');
    }
});

sql = `
ALTER TABLE sessions
  ADD CONSTRAINT sessions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) {
        console.log('sessions table alter error', err);
    } else {
        console.log('sessions table was altered');
    }
});




con.end();