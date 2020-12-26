const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')
const Task = require('./task')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length <= 6){
                throw new Error("Length must be greater than 6")
            }
            if(value.includes("password")){
                throw new Error("Password should not contain password string")
            }
        }
    },
    age:{
        type: Number,
        validate(value){
            if(value < 0){  
                throw new Error('Age must be a positive number')
            }
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    tokens:[{
        token : {
            type : String,
            required : true
        }
    }]
},{
    timestamps:true
})

UserSchema.virtual('tasks', {
    ref:'Task',
    localField:'_id',
    foreignField: 'owner'
})

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}



UserSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

UserSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner : user._id})
    next()
})

UserSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log("Just before saving")
    next()
})


const User = mongoose.model('User', UserSchema)

module.exports = User;