import mongoose from 'mongoose';
import { DBUser, SignUpUser, UserModifiableAttributes } from './types';
import User from './models/user.model';
import { compare } from 'bcryptjs';
import { Utils } from './utils';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return Promise.resolve(isConnected);
  }

  if (isConnected) {
    return Promise.resolve(isConnected);
  }

  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL);

    isConnected = connection.readyState === 1;

    return Promise.resolve(isConnected);
  } catch (error) {
    return Promise.reject(isConnected);
  }
};

export const createUser = async ({
  name,
  email,
  password,
  externalId,
  image,
  bio,
}: SignUpUser): Promise<DBUser> => {
  connectToDB();
  const existingUser = await User.findOne({ email }).select([
    '+password',
    '+externalId',
  ]);

  const isPasswordCorrect =
    existingUser?.password && password
      ? await compare(password, existingUser.password)
      : existingUser?.externalId === externalId;

  if (existingUser instanceof User && isPasswordCorrect) {
    return Promise.resolve({
      email: existingUser.email,
      name: existingUser.name,
      id: existingUser._id.toString(),
      image: existingUser.image,
      bio: existingUser.bio,
    });
  }

  if (password && password.length < 6) {
    throw new Error('Password should be 6 characters long');
  }

  const hashedPassword = await Utils.hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    externalId: externalId,
    image,
    bio,
  });

  if (!(user instanceof User)) {
    throw new Error('Invalid Data');
  }

  return Promise.resolve({
    email: user.email,
    name: user.name,
    id: user._id.toString(),
    image: user.image,
    bio: user.bio,
  });
};

export const signInUser = async ({
  email,
  password,
}: SignUpUser): Promise<DBUser> => {
  connectToDB();
  const user = await User.findOne({ email }).select(['+password']);

  const isPasswordCorrect =
    user?.password && password ? await compare(password, user.password) : false;

  if (user instanceof User && isPasswordCorrect) {
    return Promise.resolve({
      email: user.email,
      name: user.name,
      id: user._id.toString(),
      image: user.image,
      bio: user.bio,
    });
  }

  return Promise.reject('Invalid credentials');
};

export const getUser = async (id: string): Promise<DBUser> => {
  connectToDB();
  const user = await User.findOne({ _id: id });

  if (user instanceof User) {
    return Promise.resolve({
      email: user.email,
      name: user.name,
      id: user._id.toString(),
      image: user.image,
      bio: user.bio,
    });
  }

  return Promise.reject("Couldn't find user");
};

export const updateUserAttributes = async ({
  email,
  name,
  image,
  bio,
}: UserModifiableAttributes & { email: string }): Promise<DBUser> => {
  connectToDB();

  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      name,
      image,
      bio,
    },
    { new: true }
  );

  if (!(updatedUser instanceof User)) {
    return Promise.reject("Couldn't update user");
  }

  return Promise.resolve({
    email: updatedUser.email,
    name: updatedUser.name,
    id: updatedUser._id.toString(),
    image: updatedUser.image,
    bio: updatedUser.bio,
  });
};

export const updateUserPassword = async ({
  email,
  newPassword,
  oldPassword,
}: {
  email: string;
  newPassword: string;
  oldPassword: string;
}): Promise<DBUser> => {
  connectToDB();
  const user = await User.findOne({ email }).select(['+password']);

  const isPasswordCorrect = user?.password
    ? await compare(oldPassword, user.password)
    : false;

  if (!(user instanceof User) || !isPasswordCorrect) {
    return Promise.reject("Old passwords don't match");
  }

  const hashedPassword = await Utils.hashPassword(newPassword);

  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      password: hashedPassword,
    }
  );

  if (!(updatedUser instanceof User)) {
    return Promise.reject("Couldn't update user");
  }

  return Promise.resolve({
    email: updatedUser.email,
    name: updatedUser.name,
    id: updatedUser._id.toString(),
    image: updatedUser.image,
    bio: updatedUser.bio,
  });
};
