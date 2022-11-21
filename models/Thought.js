const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');

// sets up a reaction schema with a reactionId, reactionBody, userName, and a date created.
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat,
    },
    },
    {
        // allows getters to use the date formatting
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// sets up the thought schema with a thoughtText, createdAt, userName, and reactions 
const thoughtSchema = new Schema({ 
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat,
    },
    userName: {
        type: String,
        ref: 'user',
        required: true,
    },
    // uses the above seen reactionSchema to fill an array of reactions containing all objects in the schema
    reactions: [reactionSchema],
    },
    {
        // allows getters for date formatting and virtuals
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// thoughtSchema virtual to keep track of the number of reactions a thought has
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    }
);



const Thought = model('thought', thoughtSchema);

module.exports = Thought;