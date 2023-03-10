const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
   {
      username: {
         type: String,
         unique: true,
         required: true,
         trim: true,
         match: [/^[A-Za-z0-9_-]*$/, 'Only letters, numbers, underscores and dashes allowed']
      },
      email: {
         type: String,
         unique: true,
         required: true,
         lowercase: true,
         // only allows valid email addresses to be stored
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      thoughts: [
         {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
         }
      ],
      // references other user instances by ID
      friends: [
         {
            type: Schema.Types.ObjectId,
            ref: 'User'
         }
      ]
   },
   {
      toJSON: {
         virtuals: true,
      },
      id: false
   }
)

// virtual that returns the total amt of friends the user has
userSchema.virtual('friendCount').get(function () { return this.friends.length; });

const User = model('User', userSchema);

module.exports = User;