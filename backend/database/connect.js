const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', 'env', '.env') });



const connection = mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully ");
})
.catch(err => {
    console.log("MongoDB Connection Error", err);
});


exports.module = connection;
