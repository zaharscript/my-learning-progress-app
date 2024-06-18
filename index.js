//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
// const bootstrap =require('bootstrap');

const app = express();
const PORT = process.env.PORT || 4000;

//database connection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

mongoose.connect(process.env.DB_URI, { 
    // useNewUrlParser: true, 
    // useUnifiedTopology:true
});
const db = mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open',()=>{
    console.log("Connected to MongoDB");
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(express.static('javascript'));



app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
    
);

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//save templete engine
app.set('view engine','ejs');
app.set("views", "./views");

//routes prefix
app.use("", require("./routes/routes"));


app.listen(PORT, ()=>{
    console.log(`Connection successful establish at http://localhost:${PORT}`);
})
