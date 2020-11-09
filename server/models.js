const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  phone: String,
  password: String,
  label: String,
  title: String,
}));

exports.User = User;


const Item = mongoose.model('Item', new mongoose.Schema({
  title: String,
  data: String,
}));


exports.Item = Item;