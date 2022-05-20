const mongoose = require("mongoose");
const URI = "mongodb+srv://juan:echidna0@cluster0.lydrt.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 })
    .then(db => console.log("DB is connected"))
    .catch(err => console.log("Error",err));

module.exports = mongoose;