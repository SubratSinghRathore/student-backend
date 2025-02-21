const mongoose = require("mongoose");
require('dotenv').config();
mongoose
.connect(process.env.MONGO_DB_URL)
.then(console.log("mongo_db connected"));

const login_schema = new mongoose.Schema({
    mail: String,
    pass: String,
    
});



const login = mongoose.model('login', login_schema)

module.exports = {
    login,
}