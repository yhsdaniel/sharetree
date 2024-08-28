import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

export async function connect() {
    try {
        const connection = mongoose.connection;
        // mongoose.set('strictPopulate', false)
        
        if(process.env.MONGODB_URI){
            await mongoose.connect(process.env.MONGODB_URI);
            connection.on('connected', () => {
                console.log("MongoDB connected successfully")
            })
        }

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit(1);
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}