const express=require('express');
const session=require('express-session');
const cors=require('cors')
const app=express()
require('dotenv').config()
const PORT =process.env.PORT || 3000
const BASE_URL= process.env.BASE_URL
app.use(cors({
    origin:BASE_URL,
    credentials:true,
}));
app.set("trust proxy",1);
app.use(express.json());
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"session",
    cookie:{
        maxAge:1000*60*60,
        sameSite:"none",
        secure:true,
    }
}))
app.post('/new',async(req,res)=>{
    try {
        console.log(req.body.name);
        req.session.name=req.body.name;
        res.send({message:"saves"}).status(201);
    } catch (error) {
        console.log(error);
    }
})

app.get('/name',async(req,res)=>{
    try {
        console.log(req.session.name)
        res.send({message:req.session.name});
    } catch (error) {
        console.log(error)
    }
})
app.listen(PORT,()=>{console.log(`Server is running on ${PORT}`)})
