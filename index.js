const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express());

// MongoDB Connection 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = () => {
    try {

    }
    finally {

    };
};
run().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Edu-Shop is Running..')
});

app.listen(port, (req, res) => {
    console.log(`serverName: Edu-Shop; port: ${port}`);
})