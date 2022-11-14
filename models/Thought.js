const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({ 
    thoughtTest: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        ref: 'user',
        required: true
    },
    reactions: {
        type: Array,
        ref: 'reaction'
    },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
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