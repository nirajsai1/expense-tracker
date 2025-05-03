const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/users");
const mschema=mongoose.Schema({
    name : String,
    email : String , 
    password : String,
    profit : Number,
    loss : Number,
    transaction_data :{
        type:[[Number]]
    }
});
const model=mongoose.model("myauth",mschema);
app.post('/login',(req,res) =>
{
    console.log("from login");
    const {email_address,password}=req.body;
    model.findOne({email : email_address})
    .then((user) =>
    {
    if(user)
    {
        if(user.password ===password)
        {
            res.json([user.name,user.profit,user.loss]);
        }
        else
        {
            res.json("password incorrect");
        }
    }
    else
    {
        res.json("no record exists");
    }
})
})
app.post('/register',(req,res) =>
{
    const {name,email,password,profit,loss,transaction_data}=req.body;
    model.findOne({email : email})
    .then(user => 
    {
        if(user)
        {
            console.log(req.body);
            res.json("user already exists");
        }
        else
        {
            model.create(req.body)
    .then((user) =>res.json(user))
    .catch(err =>res.json(err));
        }
    }
    ) 
    .catch(err => res.json(err));
})

app.post("/editd",(req,res) =>
{
    const {name,email,profit,loss}=req.body;
    console.log(req.body);
    model.findOneAndUpdate({email : email},{profit : profit , loss : loss})
    .then(user =>
    {
        if(user)
        {
            res.json([profit,loss]);
        }
    }
    )
    .catch(err => res.json(err))
})
app.post("/add_data",(req,res) =>
{
    const {transaction,amount,category,email}=req.body;
    console.log(req.body);
    const new_data=[transaction,amount,category];
    model.findOneAndUpdate({email : email},{$push : {transaction_data : new_data}})
    .then(user =>
    {
        if(user)
        {
            res.json(user);
        }
    }
    )
    .catch(err => res.json(err))
})
app.listen(3001,() =>
{
    console.log("hiii from backend");
});