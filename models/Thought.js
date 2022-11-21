const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');

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
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

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
    reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
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