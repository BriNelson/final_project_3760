import pkg from 'mongoose';
const { model, Schema } = pkg;



const movieSchema = new Schema({
    
    title: String,
    key: Number,
    summary: String,
    network: String,
    imgUrl: String,
    genere: Array,
    score: Number,
    haveRead: Boolean,
    wantRead: Boolean,



})


export default model("movieSchema", movieSchema);