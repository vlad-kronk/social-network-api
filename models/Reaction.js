const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
   {
      reactionId: {
         type: Schema.Types.ObjectId,
         default: new Schema.Types.ObjectId
      },
      reactionBody: {
         type: String,
         required: true,
         maxLength: 280
      },
      username: {
         type: String,
         require: true
      },
      createdAt: {
         type: Date,
         default: new Date(),
         get: d => d.toDateString()
      }
   }
)