import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const urlSchema = new mongoose.Schema({
    uuid : {
        type:String,
        required:true,
        unique:true
    },
    originalUrl:{
        type:String,
        required:true,
    },
    shortCode:{
        type:String,
        required:true,
        unique:true
    },
    clicks: {
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
});

export default mongoose.model('Url', urlSchema);
