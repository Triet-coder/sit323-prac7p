const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
const mongoUri = process.env.MONGO_URI;

const User = mongoose.model("User", new mongoose.Schema({ name: String }));

app.use(express.json());

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");

  // CREATE
app.post("/users", async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log what the server received
    const user = await User.create({ name: req.body.name });
    res.send(user);
  } catch (err) {
    console.error("❌ Error in POST /users:", err);
    res.status(500).send("Server error");
  }
});


  // READ
  app.get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);
  });

  // UPDATE
  app.put("/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.send(user);
  });

  // DELETE
  app.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({ deleted: true });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
app.post("/users", async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name });
    res.send(user);
  } catch (err) {
    console.error("❌ Error in POST /users:", err);
    res.status(500).send("Server error");
  }
});

