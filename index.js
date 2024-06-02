const express = require("express");
const app = express();
const cors = require("cors");
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = 5000;

app.use(cors());
app.use(express.json());

function createToken(user) {

  const token = jwt.sign(
    {
      email:user.email
    },

    "secret",

    { expiresIn: "7d" }
  );

  return token;
}


function verifyToken(req,res,next) {
    const authToken=req?.headers?.authorization;
    const authToken1=req?.headers
    console.log(authToken1);
    
    // const token=header
    // const token=header
    const token = authToken.split(' ')[1];
    // console.log(token);
    console.log(authToken);
    // console.log(token);
    const verify=jwt.verify(token,'secret');
    // console.log(verify);
    if (!verify?.email) {
      return res.send("you are not authorize")
      
    }
    req.user=verify.email;
    next()
}



const uri =
  "mongodb+srv://izazahmedemon018:VJxlIwPncralbAi6@cluster0.843jjic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const productDB = client.db("productDB");
    const userDB = client.db("userInfoDB");

    const shoesCollection = productDB.collection("shoesCollection");
    const userCollection = userDB.collection("userCollection");

    // product routes
    // product routes create
    app.post("/shoes",verifyToken, async (req, res) => {
      const shoesData = req.body;
      const result = await shoesCollection.insertOne(shoesData);
      res.send(result);
    });
    // product routes gat All
    app.get("/shoes", async (req, res) => {
      const shoesData = shoesCollection.find();
      const result = await shoesData.toArray();
      res.send(result);
    });
    // product routes gat one
    app.get("/shoes/:id", async (req, res) => {
      const id = req.params.id;

      const shoesData = await shoesCollection.findOne({
        _id: new ObjectId(id),
      });
      // const result=await shoesData.toArray();
      res.send(shoesData);
    });
    // product routes patch update data
    app.patch("/shoes/:id",verifyToken, async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;

      const result = await shoesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      // const result=await shoesData.toArray();
      res.send(result);
    });
    // product routes Delete data
    app.delete("/shoes/:id", verifyToken,async (req, res) => {
      const id = req.params.id;
      // const updatedData=req.body;

      const result = await shoesCollection.deleteOne({ _id: new ObjectId(id) });
      // const result=await shoesData.toArray();
      res.send(result);
    });


    
    // user info

    app.post("/user",async (req, res) => {
      const user = req.body;

      const token=createToken(user);
    //   console.log(token);

      const isUserExist = await userCollection.findOne({ email: user?.email });
    //   console.log(isUserExist);

      if (isUserExist?._id) {
        // return res.send("Login Success")
        return res.send({
          status: "success",
          message: "Log in success",
          token
        });
      }
    //   const result = await userCollection.insertOne(user);
      await userCollection.insertOne(user);
     return res.send({token});

    //   const result = await userCollection.insertOne(user);
    //   res.send(result)
    });

    //same ti change kora da a hoi sa
    // url boro ta sob somoi upera thak ba
    app.get("/user/get/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    app.patch("/user/:email", async (req, res) => {
      const email = req.params.email;
      const userData = req.body;
      const result = await userCollection.updateOne(
        { email },
        { $set: userData },
        { upsert: true }
      );
      res.send(result);
    });

    console.log(" You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Route is working");
});

app.listen(port, (req, res) => {
  console.log("App is listening on port :", port);
});

// izazahmedemon018@gmail.com
// izazahmedemon018
// VJxlIwPncralbAi6
