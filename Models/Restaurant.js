const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Registering the Restaurant Schema
const RestaurantSchema = new Schema({
    city_id :{
        type: String,
        required:true
    },
    name :{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    city : {
        type:String,
        required:true
    },
    locality :{
        type:String,
        required:true
    },
    area:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    thumb:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    type:[{
        mealtype:Number,
        name :String
    }],
    Cuisine:[{
        cuisine:Number,
        name :String
    }]
});

// checking the model existence, if not exist then create collection in DB
module.exports = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);
