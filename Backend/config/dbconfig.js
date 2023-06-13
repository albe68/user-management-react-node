const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('connected', ()=>{
    console.log("Database connection successfull");
});
connection.on('error', (error)=>{
    console.log("Database connection failed");
    console.log(error);
})

module.exports = connection;