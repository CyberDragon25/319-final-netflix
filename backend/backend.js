var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

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
            "password": req.body.password,
            "favorites": []

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

app.get("/users/:id", async (req, res) => {
    const userId = req.params.id;
    console.log(req.params.id);
    try {
        await client.connect();
        const user = await client.db(dbName).collection("users").findOne({ "_id": new ObjectId(userId) });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    } finally {
        await client.close();
    }
});

app.get('/users/favorites/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      await client.connect();
      const user = await client.db(dbName).collection('users').findOne({ "_id": new ObjectId(userId) });
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      const favorites = user.favorites || [];
      res.status(200).send({ favorites });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send({ error: 'An internal server error occurred' });
    } finally {
      await client.close();
    }
  });

  app.post('/users/favoritesAdd/:id/', async (req, res) => {
    const userId = req.params.id;
    const movieId  = req.body.movieId;
    console.log("Favorite ID: " + movieId);
    console.log("Body: " + req.body.movieId);

    try {
      await client.connect();
      const result = await client.db(dbName).collection('users').updateOne(
        { "_id": new ObjectId(userId) },
        { $addToSet: { favorites: movieId } }
      );
      res.status(200).send({ message: 'Favorite added successfully' });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).send({ error: 'An internal server error occurred' });
    } finally {
      await client.close();
    }
  });

  app.post('/users/removeFavorite/:id/', async (req, res) => {
    const userId = req.params.id;
    const movieId  = req.body.movieId;
  
    try {
      await client.connect();
      const result = await client.db(dbName).collection('users').updateOne(
        { "_id": new ObjectId(userId) },
        { $pull: { favorites: movieId } } 
      );
      if (result.modifiedCount === 0) {
        res.status(404).send({ error: 'Favorite not found' });
      } else {
        res.status(200).send({ message: 'Favorite removed successfully' });
      }
    } catch (error) {
      console.error('An error occurred:', error);
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