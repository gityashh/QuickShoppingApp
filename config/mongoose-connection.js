const mongoose = require('mongoose');

function connection() {
    mongoose.connect(process.env.MONGOURL)
      .then(() => console.log('Connected!'));
}

module.exports = connection;
