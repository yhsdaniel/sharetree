import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

export async function connect() {
    try {
        const connection = mongoose.connection;
        mongoose.set('strictPopulate', false)
        if(process.env.MONGODB_URI){
            mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectOptions);
            connection.on('connected', () => {
                console.log("MongoDB connected successfully")
            })
        }

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
        })
    } catch (error) {
        console.log(error);
    }
}