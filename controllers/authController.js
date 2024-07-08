const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Organisation = require('../models/organisation');
require('dotenv').config();

const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.createUser({
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });
    console.log('Registration Response:', user); // Log user registration details

    const organisation = await Organisation.createOrganisation({
      orgId: uuidv4(),
      name: `${firstName}'s Organisation`,
      description: '',
    });
    console.log('Organisation Response:', organisation); // Log organisation creation details

    await supabase.from('user_organisations').insert({
      userId: user.data.userId,
      orgId: organisation.data.orgId,
    });

    const token = jwt.sign({ userId: user.data.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token:', token); // Log generated token

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.data.userId,
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          phone: user.data.phone,
        },
      },
    });
  } catch (error) {
    console.error('Registration Error:', error); // Log any registration errors

    res.status(400).json({
      status: 'Bad request',
      message: 'Registration unsuccessful',
      statusCode: 400,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user.data) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.data.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed',
        statusCode: 401,
      });
    }

    const token = jwt.sign({ userId: user.data.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.data.userId,
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          phone: user.data.phone,
        },
      },
    });
  } catch (error) {
    res.status(402).json({
      status: 'Bad request',
      message: 'Authentication failed',
      statusCode: 400,
    });
  }
};

module.exports = { register, login };
