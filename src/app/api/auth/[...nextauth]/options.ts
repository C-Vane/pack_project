import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
import DatabaseAdapter from '@/src/utils/db';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        //TODO: Check if user is in db
        //TODO: If user in db return user but with saved data
        //TODO: if new user save to database
        console.log(profile, 'GIT_HUB');
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'Your user name',
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
      async authorize(credentials, req) {
        //TODO: Get user with provided credentials
        console.log(credentials);
        return {
          id: '1',
          name: '',
          email: '',
          image: '',
        };
      },
    }),
  ],
  adapter: DatabaseAdapter(),
  debug: process.env.NODE_ENV === 'development',
};
