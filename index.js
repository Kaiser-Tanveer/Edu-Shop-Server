const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

// app.use(cors());
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.use(express.json({ limit: "30mb" }));
// app.use(express.json());

// MongoDB Connection 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tl2ww1y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = () => {
    try {
        // Collections 
        const categoriesCollection = client.db("EduShop").collection("categories");
        const productsCollection = client.db("EduShop").collection("products");
        const bookingsCollection = client.db("EduShop").collection("bookings");


        // getting categories 
        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        })


        // getting products 
        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })

        // getting specific products by category
        app.get('/products/:name', async (req, res) => {
            const name = req.params.name;
            const filter = { category_name: name };
            const result = await productsCollection.find(filter).toArray();
            res.send(result);
        })

        // getting specific products by category
        app.get('/homeProduct', async (req, res) => {
            const query = { category_name: 'pens' }
            const result = await productsCollection.find(query).toArray();
            res.send(result);
        })

        // getting specific products 
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const filter = { _id: ObjectId(id) };
            const result = await productsCollection.findOne(filter);
            res.send(result);
        })

        app.post('/myProducts', async (req, res) => {
            const product = req.body;
            const result = await bookingsCollection.insertOne(product);
            res.send(result);
        })

        app.get('/myProducts', async (req, res) => {
            const query = {};
            const products = await bookingsCollection.find(query).toArray();
            res.send(products);
        })

    }
    finally {

    };
};
run()

app.get('/', (req, res) => {
    res.send('Edu-Shop is Running..')
});

app.listen(port, (req, res) => {
    console.log(`serverName: Edu-Shop; port: ${port}`);
})