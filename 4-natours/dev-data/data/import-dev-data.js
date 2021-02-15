const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    //.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection sucessful!!');
  });

//READ FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//IMport data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loaded successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//DELETE all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data deleted successfully!!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
