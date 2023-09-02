import NextAuth from 'next-auth/next';

import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';

import { routes } from '@/src/utils/routes';
import { createUser, signInUser } from '@/src/utils/db';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async profile(profile) {
        const user = await createUser({
          name: profile.name,
          email: profile.email,
          externalId: profile.id,
          image: profile.avatar_url,
        });
        return user;
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'email',
      credentials: {
        name: {
          label: 'Name:',
          type: 'name',
          placeholder: 'Your Name',
        },
        email: {
          label: 'E-mail:',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {
          label: 'Password: ',
          type: 'password',
          placeholder: '**********',
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Invalid Credentials');
        }
        return await signInUser(credentials);
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: routes.signin,
    signOut: routes.home,
    error: routes.serverError,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) {
        session.user = { ...session.user, ...token.user };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
