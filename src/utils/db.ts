import mongoose from 'mongoose';

import type { Adapter, AdapterUser } from '@auth/core/adapters';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return console.log('Missing MongoDB URL');
  }

  if (isConnected) {
    return console.log('MongoDB connection already established');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

export default function DatabaseAdapter(): Adapter {
  return {
    async createUser(user: AdapterUser) {
      console.log('User Created');
      return user;
    },
    async getUser(id: string) {
      return { id: id, email: '', emailVerified: null };
    },
    async getUserByEmail(email: string) {
      return { id: '', email: email, emailVerified: null };
    },
    async updateUser(user: AdapterUser) {
      return user;
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      return { sessionToken, userId, expires };
    },
  };
}
