import pkg from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema, model } = pkg

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  timeRegistered: {
    type: Date,
    default: Date.now,
  },
  timeLogged: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    default: null,
  },
})

userSchema.pre('save', async function (next) {
  if(this.isModified('password')) {
    const salt = await bcrypt.genSalt(6)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

export default User