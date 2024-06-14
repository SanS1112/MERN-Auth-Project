import mongoose from "mongoose";

const Schema= mongoose.Schema

const ExerciseSchema= new Schema({
    name :{
        type:String,
        required:true
    }, 
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    }, 
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"}
},{timestamps:true})

const Exercise = mongoose.model("Exercise", ExerciseSchema)
export  default Exercise;