const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/link', require('./routes/link'));
app.use('/t', require('./routes/redirect'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', ((req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  }))
}

const PORT = config.get('port') || 3010;
const MONGO_URI = config.get('mongoUri');

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }, err => {
      if (err) throw err;
      console.log('Connected to MongoDB successfully!');
    });

    app.listen(PORT, () => {console.log(`Server has been started on port ${PORT}...`)});
  } catch (error) {
    console.log('Server error: ', error.message);
    process.exit(1);

  }
}

start();
