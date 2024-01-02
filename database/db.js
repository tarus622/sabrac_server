const mongoose = require('mongoose');

module.exports = function mongoDbConnection() {
    // Detect the environment
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Use the appropriate database connection string
    const dbConnectionString = isDevelopment
        ? process.env.DB_CONNECTION_STRING_DEV
        : process.env.DB_CONNECTION_STRING_PROD;

    const connectionPromise = mongoose.connect(dbConnectionString);

    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    // Handle disconnection events (optional)
    db.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    // Gracefully close the MongoDB connection on process termination
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });
    });

    return connectionPromise;
}