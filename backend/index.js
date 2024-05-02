const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
console.log(`Server is running on ${PORT}`);
});

app.get("/users/:id", async (req, res) => {
        try {
        const id = req.params.id;
        const query = "SELECT * FROM users WHERE id = ?";
        const [result] = await db.query(query, [id]); 
        console.log("Success in Reading MySQL");
        res.status(200).send(result);
        } catch (err) {
        console.error("Error in Reading MySQL :", err);
        res.status(500).send({ error: 'An error occurred while fetching items.' });
        }
        });

app.post("/users/add", async (req, res) => {
    try {
        const { email,password } = req.body;
        const query = "INSERT INTO users (email, password) VALUES (?, ?)";
        const [result] = await db.query(query, [email, password]);
        console.log("Success in Reading MySQL");
        res.status(200).send({ message: "Item created successfully", id: result.insertId });
    }   catch (err) {
        console.error("Error in Reading MySQL :", err);
        res.status(500).send({ error: 'An error occurred while creating a new item.' });
    }
});

app.post("/users/login", async (req, res) => {
    try {
        const { email,password } = req.body;
        const query = "SELECT id FROM users WHERE email = ? AND password = ?";
        const [result] = await db.query(query, [email,password]);
        console.log("Success in Reading MySQL");
        res.status(200).send({ message: "User created ", id: result.insertId });
    }   catch (err) {
        console.error("Error in Reading MySQL :", err);
        res.status(500).send({ error: 'An error occurred while creating a new item.' });
    }
});
    

app.put("/users/edit/:id", async (req, res) => {
    try {
        const { email,password } = req.body;
        const id = req.params.id;
        console.log(id);
        const query = "UPDATE users SET email = ?, password = ? WHERE id = ?";
        await db.query(query, [email,password, id]);
        console.log("Success in Reading MySQL");
        res.status(200).send({ message: "Item updated successfully" });
    } catch (err) {
        console.error("Error in Reading MySQL :", err);
        res.status(500).send({ error: 'An error occurred while updating the item.' });
    }
});

app.delete("/users/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query = "DELETE FROM users WHERE id = ?";
        await db.query(query, [id]);
        console.log("Success in Reading MySQL");
        res.status(200).send({ message: "Item deleted successfully" });
    } catch (err) {
        console.error("Error in Reading MySQL :", err);
        res.status(500).send({ error: 'An error occurred while deleting the item.' });
    }
});