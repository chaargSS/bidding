var express = require('express');
var router = express.Router();
var connection=require('../utils/mysql');
var crypto=require('../utils/hash-salt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});


router.post('/signup',(req,res)=>{   
  //console.log(req.body);       
        var user={
          name:req.body.name,
          email:req.body.email,
          bids:req.body.bids,
          password:req.body.psw,          
       };
 
      Object.assign(user, crypto.createHash(user.password));
     //console.log(user);
     
      connection.query(`INSERT INTO users SET ? ;`,user,function(error,results) {
         if (error) {
             console.log(error.message);
         } else {
           console.log('inserted id:'+results.insertId);  
           res.redirect('/');  
         }        
     });            
 });


 router.post('/login',(req,res)=>{  
     console.log(req.body); 
    connection.query(`SELECT * FROM users  WHERE name like '${req.body.uname}'`,function(error,result) {
      if (error) {
          console.log(error.message);
      } else {
        if(result.length>0){
          if(crypto.validate(result[0].password,result[0].salt,req.body.psw)){
            console.log('password success'); 
            
            connection.query(`SELECT * FROM bids  WHERE name like '${result[0].name}'`,function(error,resul) {
              if (error) {
                  console.log(error.message);
              } else {
                console.log(result[0].bids);
                var remain=parseInt(result[0].bids)-resul.length;
                console.log(remain);
                res.render('bidding',{name:result[0].name,bid:result[0].bids,finished:resul.length,remain:remain});
              }
            });
           
        
          }else{
            console.log('password did not match');
            res.json({
                status:false,                  
                message:"Email and password does not match"
                });
          }
        }else{
          console.log('register first');
          res.json({
            status:false,
          message:"User does not exits"
        });
        }   
      } 
    });
})

router.post('/bidsave',(req,res)=>{
    
  console.log(req.body);
   connection.query(`INSERT INTO bids SET ? ;`,req.body,function(error,results) {
    if (error) {
        console.log(error.message);
    } else {
      console.log('inserted bid:'+results.insertId); 
    }        
    }); 

})

router.post('/bidhistory',(req,res)=>{
    
  console.log(req.body);
    
      connection.query(`SELECT * FROM bids  WHERE name like '${req.body.name}'`,function(error,result) {
        if (error) {
            console.log(error.message);
        } else {
          res.send(result);
        }
      });

})


module.exports = router;
