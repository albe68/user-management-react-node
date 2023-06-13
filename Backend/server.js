const express = require('express');
const app = express();
require('dotenv').config();

const dbconfig=require('./config/dbconfig')
const PORT = process.env.PORT || 5000;
app.use(express.json());
const adminRoute=require('./routes/adminRouter')
const usersRoute=require('./routes/userRoutes')

app.use('/api/users', usersRoute);
app.use('/api/admin',adminRoute)


app.listen(PORT, ()=>{
    console.log(`server connected to ${PORT}`);
});