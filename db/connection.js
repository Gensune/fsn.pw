import { config } from '../config.js'

import monk from 'monk';
const uri = config.mongoUri;

const db = monk(uri);

export default db;