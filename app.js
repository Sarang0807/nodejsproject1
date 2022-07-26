var express=require("express");
var bodyparser=require("body-parser");
var router=require("./router");
var app=express();



//middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

router(app);

app.listen(7000,()=>{

    console.log("running at port number 7000");
});