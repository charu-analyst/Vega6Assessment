import mongoose from  'mongoose';
mongoose.pluralize(null);


const blogSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    blogImage:{type:String},
    userId:{type:mongoose.Types.ObjectId,ref:'users'},
    comments:[{type:mongoose.Types.ObjectId,ref:'comments'}],
    status:{type:String,enum:['ACTIVE','BLOCKED','DELETE'],default:'ACTIVE'}
},{timestamps:true});

const blogModel = mongoose.model("blogs", blogSchema);
export default blogModel; 
