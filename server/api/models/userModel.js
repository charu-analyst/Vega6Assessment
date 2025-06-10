import mongoose from  'mongoose';
mongoose.pluralize(null);


const userSchema = new mongoose.Schema({
    email:{type:String},
    password:{type:String},
    image:{type:String},
    status:{type:String,enum:['ACTIVE','BLOCKED','DELETE'],default:'ACTIVE'}
},{timestamps:true});

const userModel = mongoose.model("users", userSchema);
export default userModel; 
