import mongoose from "mongoose"

export default function connection(DATABASEURL) {

    mongoose.connect(DATABASEURL)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) =>
            console.log("Error while connecting to database", err)
        );
}
