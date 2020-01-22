// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, id) => {
//   console.log(`ID is:${id}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid id'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'Price or name is missing'
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    // console.log(req.requestTime);
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid Request'
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    // console.log(req.params);
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid user id'
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour= new Tour();
    // newTour.save().then()
    const newTour = await Tour.create(req.body);
    // console.log(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid data set'
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const modTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: modTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid data set'
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: 'Invalid data set'
    });
  }
};
