const mongoose = require('mongoose');

// load MongoDB connection
const mongo_url = process.env.MONGO_CONN;

// connect to MongoDB
const db =  async()=>{
    try {
        await mongoose.connect(mongo_url)
        console.log("MongoDB connected");      
    } catch (error) {
        console.log('DB Error:', error.message);
    }
}
module.exports=db;