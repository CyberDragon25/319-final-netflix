var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

app.post("/users/add", async (req, res) => {
    try {
        await client.connect();
        const newDocument = {
            "_id": new ObjectId(),
            "email": req.body.email,
            "password": req.body.password
        };
        const results = await client.db(dbName).collection("users").insertOne(newDocument);
        res.status(200).send(results);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    } finally {
        await client.close();
    }
});

app.delete("/users/delete/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        await client.connect();
        const query = { _id: id };
        const results = await client.db(dbName).collection("users").deleteOne(query);
        res.status(200).send(results);
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.put("/users/edit/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        await client.connect();
        const query = { _id: id };
        const updateData = {
            $set: {
                "email": req.body.email,
                "password": req.body.password
            }
        };
        const options = {};
        const results = await client.db(dbName).collection("users").updateOne(query, updateData, options);
        res.status(200).send(results);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        await client.connect();
        const query = { email: email, password: password };
        const result = await client.db(dbName).collection("users").findOne(query, { _id: 1 });
        if (result) {
            res.status(200).send({ message: "Login successful", id: result._id });
        } else {
            res.status(401).send({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send({ error: 'An internal server error occurred' });
    } finally {
        await client.close();
    }
});