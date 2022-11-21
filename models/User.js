const { Schema, model } = require('mongoose');

// sets up the user schema with a userName, email, thoughts, friends
const userSchema = new Schema({
    userName: { 
        type: String,
        require: true,
        unique: true, 
        trim: true
    },
    email: { 
        type: String, 
        require: true, 
        unique: true, 
        match: /.+\@.+\..+/, 
    },
    // creates an array of thoughts consisting of individual thought objects
    thoughts: [
    { 
        type: Schema.Types.ObjectId,
        ref: 'thought',
    },
    ],
    // creates an array of friends consisting of individual users objects
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    ],
    },
    {
        // allows the use of virtuals
        toJSON: {
            virtuals: true,
        },
      id: false,
    }
);

// userSchema virtual to track number of friends a user has
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    }
);

const User = model('user', userSchema);

module.exports = User;