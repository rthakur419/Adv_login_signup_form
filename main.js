var fs = require('fs');
//var data =[];
var un;
var data = (JSON.parse(fs.readFileSync('data.txt')));
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//var session =  require("express-session");
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/login.html'));
});
app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/auth', function(req, res) {
	var username = req.body.username;
    var password = req.body.password;
    var flag = 0;
    if(username && password){
        for(var i in data){
        if(username === data[i].username && password === data[i].password){
          flag = 1;
          un = username;
         break;
        }
        else{
        flag = 0;
        }
        }
    if (flag)  {
    res.redirect('/home');}
    else{
        res.send('Incorrect Id or Password');
    }
    res.end();
    }else {
		res.send("Please enter Username and Password!");
		res.end();
    }
});
app.set('view engine','ejs');
app.get('/home',function(req, res){
 var username = un;
res.render( 'home',{username});
});
app.get('/signup',function(req, res){
    res.sendFile(path.join(__dirname + '/signup.html'))
});
app.post('/valid',function(req, res){
var obj ={
    username : req.body.email,
    password : req.body.psw
};
data.push(obj);
fs.writeFile(__dirname+'/data.txt', JSON.stringify(data), 'utf8', function (err) {
    if (err) {
        console.log("Error");
        return console.log(err);
    }
 
    console.log("User has been added");
    res.redirect('/');
});
});
app.listen(80);