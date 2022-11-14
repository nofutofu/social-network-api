const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');

const thoughtSchema = new Schema({ 
    thoughtTest: {
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
    username: {
        type: String,
        ref: 'user',
        required: true,
    },
    reactions: [
        {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
        },
    ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;