const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
        });
        console.log('Connected to MongoDB');

    } catch {
        console.log('Failed to connect to MongoDB', err);
        process.exit(1)
    }
}

module.exports = connectDB;