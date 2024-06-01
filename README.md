https://expressjs.com/en/starter/installing.html

$ mkdir myapp
$ cd myapp

then  $ npm init

or  bast     $ npm init -y

$ npm install express


================
https://expressjs.com/en/starter/hello-world.html
=============

creat index.js
start server==  
node index.js


easy server start package.json add comment add  then only use [npm start]
"scripts": {
    "start": "node index.js",

"start": "node index.js",
    "dev": "nodemon index.js",




npm start

========================================



meadelwere
Express cors middleware

$ npm install cors


var cors = require('cors')

var app = express()

app.use(cors())




another meddleware
app.use(express.json())


mongoDb
user name izazahmedemon018
password VJxlIwPncralbAi6


npm install mongodb
========================
*************************

All 

npm i express cors mongodb

*****************************
======================================


=======================
use nodemon
https://www.npmjs.com/package/nodemon

npm i nodemon

****************
run server

npm run dev
> npm run dev


remove // "start": "node index.js",
use  "start": "nodemon index.js",

bydefolt server start

=====================

mongodb crud

https://www.mongodb.com/docs/drivers/node/v3.6/usage-examples/findOne/

// izazahmedemon018@gmail.com
// izazahmedemon018
// VJxlIwPncralbAi6

=============================
============================
node js project GitHub uplode

node_modules ignore kor ta ho ba

ti

.gitignore  file creat kora tar ve tor likta hoba

node_modules/

/node_modules


===============================
*******************************

setup code


setup code


const express=require("express")
const app=express();
const cors=require("cors")
const port=5000;

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Route is working");
});



app.listen(port,(req,res)=>{
    console.log("App is listening on port :",port);
});


***************************
=========================
