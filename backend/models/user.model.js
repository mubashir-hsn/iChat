import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
    
        fullName:{
            type: String,
            required : true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        gender:{
         type:String,
        },
        password:{
            type:String,
            required:true
        },
        confirmPassword:{
            type:String,
        },
       about:{
        type: String,
        default:"Hi there, let's chat.",
       }
},
{
    timestamps:true
})

const User = mongoose.model('User',userSchema);

export default User