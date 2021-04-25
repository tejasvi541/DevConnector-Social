// Database Setup File
const mongoose = require("mongoose");
const config = require("config");

// Getting mongoURI
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log(`Database Connected`);
  } catch (err) {
    console.log(`${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
