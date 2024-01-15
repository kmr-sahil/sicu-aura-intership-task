import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("Mongo COnnected Successfully")
        })

        connection.on('error', (err) => {
            console.log('Mongo is having error' + err)
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong");
        console.log(error)
    }
}