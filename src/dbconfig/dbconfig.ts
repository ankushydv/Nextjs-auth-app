// import mongoose from "mongoose";

// async function connect() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI!);
//         const connection = await mongoose.connection;
//         connection.on('connected', () => {
//             console.log('Mongo Db is Connected !')
//         })
//         connection.on('error', (error) => {
//             console.log('Mongo Db is Connection error !')
//             console.log(error)
//             process.exit()

//         })

//     } catch (error) {
//         console.log('Somthing Went wrong!!!')

//         console.log(error);
//     }
// }

// export { connect };

// db.js
// db.ts
// db.ts
import mongoose, { Connection } from 'mongoose';

const MONGODB_URI: any = process.env.MONGO_URI;

let cachedDb: Connection | null = null;
// interface CustomConnectOptions extends Connection {
//     useNewUrlParser: boolean;
//     useUnifiedTopology: boolean;
// }

export const connect = async (): Promise<Connection> => {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        const options: any = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(MONGODB_URI, options);
        console.log('Connected to MongoDB');
        cachedDb = mongoose.connection;
        return cachedDb;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};



