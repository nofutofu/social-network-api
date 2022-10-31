const { Schema, model } = require('mongoose');

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
    thoughts: { 
        type: Array,
        ref: 'thought',
    },
    friends: {
        type: Array,
        ref: 'user',
    },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    }
);

const User = model('user', userSchema);

module.exports = User;