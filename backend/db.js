const mongoose = require('mongoose');

let mongoURI = 'mongodb+srv://Lucifer:lucifer123@hyp.cmbnemy.mongodb.net/inotebook?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });

    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
