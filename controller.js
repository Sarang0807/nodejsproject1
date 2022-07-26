
var fs=require('fs');

exports.getAll=function (req,resp){
    console.log("in get all")
    var path="./products.json";
    fs.readFile(path,(err,data)=>{
        if(err)
            resp.send("File IO error occured");
        else
            resp.send(JSON.parse(data));
    })

}

exports.insert=(req,resp)=>{
    console.log("inserting baba");
    var newProduct =req.body;

    var path="./products.json";
    console.log("--------");
    fs.readFile(path,(err,data)=>{
        if(err)
            resp.send("error occured IO");
        else
         {
           products=JSON.parse(data);
           products.push(newProduct);
           fs.writeFile(path,JSON.stringify(products),(err)=>{
            if(err)
            resp.send("error occured in writting");
            else
            resp.send(newProduct);
           })     
        }
    });
   
}

exports.getById=(req,res)=>{

    var id=req.params.id;
    var path="./products.json";

    fs.readFile(path,(err,data)=>{
        if(err)
            ;
        else{
            var products=JSON.parse(data);
            var p=products.find(x=>(x.id==id));
            if(p)
                res.send(p);
            else
                res.send("not found");
        }
    })

}

exports.update=(req,resp)=>{
    var p=req.body;
    var path="./products.json";
    var check=1;
    fs.readFile(path,(err,data)=>{
        if(data)
        {
            var products=JSON.parse(data);
                
                for(var i=0;i<products.length;i++){
                if(products[i].id==p.id){
                    products[i]=p;
                    check=0; 
            }}}            
            if(check==0){
                fs.writeFile(path,JSON.stringify(products),(err)=>{
                    if(err)
                        resp.send("Error occured");
                    else
                        resp.send(p);
                })
            }
            else
                resp.send("Product Not found...")         
        })
    }

    exports.delete=(req,resp)=>{
        var id=req.params.id;
        var path="./products.json";

    fs.readFile(path,(err,data)=>{
        if(err)
            ;
        else{
            var products=JSON.parse(data);            
            var i;
            products.map((el,index)=>
            {
              if(el.id==id){
                i=index;
                console.log(id+"  "+i);
              }  
            }
            )            
            if(i!=undefined){
                console.log(i+" Second");
                var arr=[];
                products.forEach((element) => {
                    if(element.id!=id)
                        arr.push(element);
                });
                fs.writeFile(path,JSON.stringify(arr),(err)=>{
                    if(err)
                        resp.send("Error while writting...");
                    else
                        resp.send("Deleted Successfully...")
                })
            }
            else{
                resp.send("Product Not Found...");
            }
        }})
    }
