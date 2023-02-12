const express= require('express')
const connectdb=require('./Config/config')
const cors= require('cors')
const User =require('./Model/User');
const { emit } = require('nodemon');


connectdb();

const app = express();
app.use(express.json());
app.use(cors());



//Create
app.post('/register',(req,res)=>{
    const {name,password, role}=req.body;
     if(name && password && role){
        User.findOne({name, name},async(err,user)=>{
            if(user){
                res.send({message : "user already exists"});
            }else{
                const user = new User({
                    name : name,
                    password : password,
                    role : role
                 });
                 const result = await  user.save();
                res.send({message : "you are loggedIn"})
            }
        })
     }else{
        res.send({message : "Input all the fields"});
     }
})


//Read
app.get('/all',(req,res)=>{
    User.find({},(err,result)=>{
        if(result){
            res.send(result);
        }else{
            res.send(err);
        }
    })
})


//Update
app.post('/update',async(req,res)=>{
    try{
        const {name}=req.body;
        const result = await User.updateOne({name},{
            $set:{
                role : "Analyst"
            }
        })
        res.send(result);
    }catch(err){
        console.log(err);
    }
})


//Delete
app.post('/delete',async(req,res)=>{
    try{
        const {name}=req.body;
        const result= await User.deleteOne({name : name}) 
        console.log(result);
    }catch(err){
        console.log(err);
    }
})



//Pagination

app.get('/data',async(req,res)=>{
    try{
        const {page, limit}= req.query;
        if(!page){
            page =1;
        }
        if(!limit){
            limit =3;
        }
        const skip = (page-1)*3;
        const result = await User.find().skip(skip).limit(limit);
        res.send(result);
    }catch(err){
        console.log(err);
    }
})



app.listen(7000,()=>{
    console.log("Server Connected");
})