const mongoose = require('mongoose');

const connectdb=async()=>{
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect('mongodb+srv://root:root@cluster0.xyqucy8.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser : true
        },()=>{
            console.log("Db connected");
        })
    }catch(err){
        console.log(err);
    }
}
connectdb();
module.exports = connectdb;