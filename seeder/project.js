// CREATE TABLE `projects` (
//     `id` int(10) UNSIGNED NOT NULL,
//     `content` text NOT NULL,
//     `user_id` int(10) UNSIGNED DEFAULT NULL,
//     `image` text NOT NULL,
//     `amount_goal` int(11) UNSIGNED NOT NULL,
//     `amount_collected` int(11) UNSIGNED NOT NULL,
//     `created_at` date NOT NULL DEFAULT current_timestamp(),
//     `updated_at` date NOT NULL DEFAULT current_timestamp(),
//     `status` enum('to_review','approved','disapproved') NOT NULL DEFAULT 'to_review'
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

import { faker } from '@faker-js/faker';


export function createProject() {
    const goal = faker.number.int({ min: 100, max: 9999999 })
    return {
        title: faker.word.words({ count: { min: 2, max: 7 } }),
        content: faker.word.words({ count: { min: 10, max: 100 } }),
        // user_id
        image: faker.image.url(),
        amount_goal: goal,
        amount_collected: 0,
        created_at: faker.date.past({ years: 2 }),
        updated_at: faker.date.recent({ days: 30 }),
        status: faker.helpers.arrayElement(['to_review', 'approved', 'approved', 'disapproved', 'done'])
    }

}
