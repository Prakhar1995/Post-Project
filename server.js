var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8086;
const mongojs = require('mongojs')
const db = mongojs('Postdata', ['postdata']);
var bodyParser   = require('body-parser');
app.use(bodyParser());

app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');  
})
app.use("/",
    express.static( __dirname)
)
app.post('/data', function(req, res) {
    
    
    console.log(req.body,"body")
   db.postdata.insert({Post:req.body.data,Time:req.body.time,number:req.body.number,Name:req.body.Name},function(err, doc) {
    res.json(doc);
    });
})
app.post('/like', function(req, res) {
    console.log("ObjectId("+'"'+String(req.body.id)+'"'+")")
    console.log(req.body.a,"body")
    
    db.postdata.update(
        { _id: mongojs.ObjectId(req.body.id) },
        { $inc: { number: req.body.a}}, function (err, docs) {
            console.log(docs,"docs")
            res.json(docs)
        } 
     )
    // db.postdata.findAndModify({
    //     query: {  _id: mongojs.ObjectId(req.body.id) },
       
    //     update: { $inc: { number: 1 }, function (err, docs) {
    //               console.log(docs,"docs")
    //                  res.json(doc)
    //              } },
    //     })
})

    app.get('/data', function(req, res) {
        
        console.log(req.body)
        
       db.postdata.find(function(err, doc) {
        res.json(doc);
        });
  });



  app.listen(port);
  console.log("listening to"+port)