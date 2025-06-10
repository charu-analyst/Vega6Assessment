import mongoose from  'mongoose';
mongoose.pluralize(null);


const commentSchema = new mongoose.Schema({
    blogId:{type:mongoose.Types.ObjectId,ref:'blogs'},
    userId:{type:mongoose.Types.ObjectId,ref:'users'},
    comment:{type:String},
    status:{type:String,enum:['ACTIVE','BLOCKED','DELETE'],default:'ACTIVE'}
},{timestamps:true});

const commentModel = mongoose.model("comments", commentSchema);
export default commentModel; 
