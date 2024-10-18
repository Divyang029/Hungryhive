const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');


const getUsers = async (req, res, next) => {
  const userid = req.params.userid;

  if(!userid){
      let users;
      try {
        users = await User.find({}, '-password');
      } catch (err) {
        const error = new HttpError(
          'Fetching users failed, please try again later.',
          500
        );
        return next(error);
      }
      res.json({users: users.map(user => user.toObject({ getters: true }))});
  }
  else{
      try {
        orders = await User.findById(userid);
      } catch (err) {
        const error = new HttpError(
            'Fetching ordre failed, please try again later.',
            500
        );
        return next(error);
      }
    res.json({orders: orders.toObject()});
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  res.json({message: 'Logged in!',userid: existingUser._id});
};

const checkuser = async (req,res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        exists: true,
        userId: existingUser._id
      });
    } else {
      return res.status(200).json({
        exists: false
      });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return res.status(500).json({
      message: 'Error checking user'
    });
  }
};


const createUser = async (req, res) => {
  const { email, name} = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(201).json({
        userId: existingUser._id,
        message: 'User Found successfully'
      });
    }

    // Create a new user
    const newUser = new User({
      name: name || 'User', // Default to 'Unknown' if no name is provided
      email,
    });

    // Save the user in the database
    await newUser.save();

    return res.status(201).json({
      userId: newUser._id,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      message: 'Error creating user'
    });
  }
};

exports.getUsers = getUsers;
exports.login = login;

exports.createUser= createUser;