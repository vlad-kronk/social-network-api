const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUserData, getRandomStringArr } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
   console.log('connected');

   // drop existing users
   await User.deleteMany({});

   // drop existing thoughts
   await Thought.deleteMany({});

   const users = [];

   for (let i = 0; i < 20; i++) {
      const thoughts = getRandomStringArr(5).map((str) => { return { thoughtText: str, }}))
   }
})