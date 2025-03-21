// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { createTables } = require('./database'); // Database.js থেকে createTables ইম্পোর্ট
const router = require('./router'); // router.js থেকে রাউটগুলি ইম্পোর্ট

const app = express();
const port = 3001;

// Body-parser middleware
app.use(bodyParser.json());

// রাউটগুলো ব্যবহার করা
app.use('/api', router);

// ডেটাবেজ টেবিল তৈরি করা
createTables();

// সার্ভার চালু করা
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
