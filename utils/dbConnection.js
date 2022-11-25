import mongoose from "mongoose"

// dbConnection method to connect with database
export const dbConnection = async () => {
    try {
        const db = mongoose.connect(`${process.env.MONGO_URI}`, {
            useNewUrlParser: true
        })
        if(db){
            console.log("database connected!");
        }
    } catch (error) {
        console.log(error);
    }
}