// CREATE TABLE `users` (
//     `id` int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
//     `name` varchar(100) NOT NULL UNIQUE,
//     `password` char(32) NOT NULL,
//     `email` varchar(100) NOT NULL UNIQUE,
//     `role` enum('admin','user','powered') NOT NULL DEFAULT 'user'
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


import { faker } from '@faker-js/faker';
import md5 from 'md5';

export function createUser() {
    return {
        name: faker.internet.username(),
        password: md5('123'),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(['admin', 'user', 'user', 'user', 'user', 'user', 'powered'])

    }

}
