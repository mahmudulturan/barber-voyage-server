import mongoose from 'mongoose';
import configs from '.';

try {
    const dbURI = configs.database_url as string;
    mongoose.connect(dbURI)
    console.log("Successfully connected with database!!");
} catch (error) {
    console.log(error);
}