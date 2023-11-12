//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
// const bootstrap =require('bootstrap');

const app = express();
const PORT = process.env.PORT || 4000;

//database connection
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

//routes prefix
// app.use("",require(".routes/routes"))
app.use("", require("./routes/routes"));

// app.get("/",(req,res)=>{
//     res.send("Hellow World");
// })

app.listen(PORT, ()=>{
    console.log(`Connection successful establish at http://localhost:${PORT}`);
})
