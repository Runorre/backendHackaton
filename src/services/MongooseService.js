import mongoose from 'mongoose';

let mongoURI = `mongodb://127.0.0.1:27017`;

mongoose.connection.on('connected', () => {
    console.log("[Database] Successfully connected !");
});

mongoose.connection.on('error', () =>
    console.error('[Database] Failed to connect on the database.')
);

export const connectDb = async() => {
    console.log('[Database] Connecting to database..');
    await mongoose.connect(mongoURI, {dbName: "backend"});
}