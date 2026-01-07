import mongoose from "mongoose";

const connectdb = async () => {
    mongoose.connection.on("connected", () => console.log("Database connected"));
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/todo-app`);
    } catch(error) {
        console.log(error.message);
    }
}

export default connectdb;