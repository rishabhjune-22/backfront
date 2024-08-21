const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
gender:{
        type: String,
        enum:["male","female","others"],
        required: true
    },
    role:{
        type: String,
        enum:["customer","realtor"],
        default: "customer"
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel