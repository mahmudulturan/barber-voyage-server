import mongoose from 'mongoose';

try {
    const dbURI = process.env.DB_URI;
    if (!dbURI) {
        throw new Error("DB_URI is required to connect with database!");
    }
    mongoose.connect(dbURI)
    console.log("Successfully connected with database!!");
} catch (error) {
    console.log(error);
}