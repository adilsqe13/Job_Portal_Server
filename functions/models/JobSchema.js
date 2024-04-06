const mongoose = require('mongoose');

const JobDetails = new mongoose.Schema({
    designation:{
        type:String
    },
    description:{
        type:String
    },
    company:{
        type:String
    },
    location:{
        type:String
    },
    salary:{
        type:Number
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});


module.exports = mongoose.model('jobs', JobDetails);