const mongoose = require ('mongoose');
const {db}= require('./models/Book');


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
     .then(db => console.log('DB is Connected'))
     .catch(err => console.error(err));