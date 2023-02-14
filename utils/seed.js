const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomStringArr, getRandomArrItem } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
   console.log('connected');

   // drop existing users
   await User.deleteMany({});

   // drop existing thoughts
   await Thought.deleteMany({});

   let thoughts = []

   for (let i = 0; i < 150; i++) {
      thoughts.push({
         thoughtText: getRandomStringArr(1)[0],
         username: ""
      })
   }

   const thoughtData = await Thought.collection.insertMany(thoughts);
   // console.log(thoughtData);

   let users = [];

   for (let i = 0; i < 50; i++) {
      let tempThoughtsArr = [];

      for (let j = 0; j < 3; j++) {
         const index = i * 3 + j;
         // console.log(thoughtData.insertedIds);
         tempThoughtsArr.push(thoughtData.insertedIds[`${index}`]);
      }
      // console.log(tempThoughtsArr);

      const tempUsername = getRandomUsername();

      for (let j = 0; j < 3; j++) {
         await Thought.findOneAndUpdate(
            { _id: tempThoughtsArr[j] },
            { username: tempUsername }
         )
         // console.log(tempThoughtsArr[j]);
      };

      users.push({
         username: tempUsername,
         email: `${tempUsername}@example.com`,
         thoughts: tempThoughtsArr
      });
   }

   await User.collection.insertMany(users);



   console.table(users);
   console.info('Seeding complete! 🌱');
   process.exit(0);
});