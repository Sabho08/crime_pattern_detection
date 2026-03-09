const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../backend_service/.env') });

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

async function test() {
    try {
        await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('COLLECTIONS: ' + collections.map(c => c.name).join(', '));

        const count = await mongoose.connection.db.collection('crime_incidents').countDocuments();
        console.log('COUNT: ' + count);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
test();
