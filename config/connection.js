const mongoose = require('mongoose');

// connects the mongoDB to run the database on a server
mongoose.connect('mongodb://127.0.0.1:27017/networkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection; 