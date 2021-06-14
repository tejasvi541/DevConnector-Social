// Database Setup File
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
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
