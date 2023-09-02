import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: false,
      select: false,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [4, 'Name should be atleast 4 characters long'],
      maxLength: [30, 'Name should be less than 30 characters'],
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    image: String,
    bio: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
