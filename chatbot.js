var express=require("express");
var app=express();
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const dbName='botservices';
let db;
MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true},(err,client)=>{
    if(err) return console.log(err);
    db=client.db(dbName)
    console.log(`Connected to database:${url}`);
    console.log(`Database : ${dbName}`);
});
app.post('/fetchdetails',function(req,res){
    console.log('search user by phone number');
    var phno=req.body.phone;
    var query={"phone":phno};
    console.log(query);
    db.collection('customer').find(query).toArray(function(err,result){
        if(err) console.log("No match found");
        res.json(result);
    });
});

app.post('/fetchusername',(req,res)=>{
    console.log(req.body);
    var phno=req.body.queryResult.queryText;
    console.log(phno);
    db.collection("customer").find({"phno":phno}).toArray().then((result)=>{
        console.log(result);
        res.json(result);
    }).catch((err)=>{
        res.send("please enter a valid phone no");
    });
});
app.listen(3001);