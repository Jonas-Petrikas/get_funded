console.log('start seeding');

import { faker } from '@faker-js/faker';
const usersCount = 9;

const masyvas = faker.helpers.multiple(faker.internet.username, { count: usersCount })
console.log(masyvas.length);