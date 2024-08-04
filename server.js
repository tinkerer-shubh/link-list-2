const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const linkSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Link = mongoose.model('Link', linkSchema);

app.get('/api/links', async (req, res) => {
  const links = await Link.find();
  res.json(links);
});

app.post('/api/links', async (req, res) => {
  const newLink = new Link(req.body);
  await newLink.save();
  res.json(newLink);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});