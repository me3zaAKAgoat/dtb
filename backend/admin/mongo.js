require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../dist/models/user.js').default;
const Cycle = require('../dist/models/cycle.js').default;
// const Gig = require("../models/gig.js");

// console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI).then(() => {
	console.log('connected to', process.env.MONGODB_URI);
	//   User.deleteMany({}).then((result) => console.log(result));
	User.find({}).then((result) => console.log(result));
	Cycle.find({}).then((result) => console.log(result));
	Cycle.deleteMany({}).then((result) => console.log(result));
});
// mongoose.connect(process.env.MONGODB_URI).then(() => {
// 	// Gig.deleteMany({}).then((result) => console.log(result));
// 	// Gig.find({}).then((result) => console.log(result));
// });

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Replace 'YourModel' with the name of your Mongoose model
// User.collection.drop(function(err) {
//   if (err && err.message !== 'ns not found') {
//     console.error('Error dropping collection:', err);
//   } else if (err && err.message === 'ns not found') {
//     console.log('Collection not found, already deleted');
//   } else {
//     console.log('Collection successfully dropped');
//   }
// });
