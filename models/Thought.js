const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
   {
      thoughtText: {
         type: String,
         require: true,
         minLength: 1,
         maxLength: 280
      },
      createdAt: {
         type: Date,
         required: true,
         default: new Date(),
         get: d => d.toDateString()
      },
      username: {
         type: String,
         required: true,
      },
      reactions: [reactionSchema]
   },
   {
      toJSON: {
         virtuals: true,
         getters: true
      },
      id: false,
   }
);

thoughtSchema.virtual('reactionCount').get(function () { return this.reactions.length; });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;