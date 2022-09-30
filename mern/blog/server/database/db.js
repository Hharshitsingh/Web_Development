import mongoose from "mongoose";

const db = async (username, password) => {

    // const URL = `mongodb+srv://${username}:${password}@blogapp.ecsyb15.mongodb.net/?retryWrites=true&w=majority`
    const URL = 'mongodb://127.0.0.1:27017/projectDB?retryWrites=true&w=majority'

    // const URL = "mongodb://blogAd:2uryjhsUCPUhtkvt@ac-cvpem3d-shard-00-00.ecsyb15.mongodb.net:27017,ac-cvpem3d-shard-00-01.ecsyb15.mongodb.net:27017,ac-cvpem3d-shard-00-02.ecsyb15.mongodb.net:27017/?ssl=true&replicaSet=atlas-l9059h-shard-0&authSource=admin&retryWrites=true&w=majority"

    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('MongoDB connected');
    }
    catch (e) {
        console.log('Error while connecting database', e.message);
        return null;
    }
}


export default db;
