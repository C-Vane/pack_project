import { generateReactHelpers } from '@uploadthing/react/hooks';
import { getServerSession } from 'next-auth';
import { FileRouter, createUploadthing } from 'uploadthing/next-legacy';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

const fileUploader = createUploadthing();

export const ourFileRouter: FileRouter = {
  profilePicture: fileUploader({
    image: { maxFileSize: '8MB', maxFileCount: 1 },
  })
    .middleware(async ({ req, res }) => {
      const session = await getServerSession(req, res, authOptions);

      if (!session || !session.user) {
        throw new Error('Unauthorized');
      }

      return { email: session.user.email };
    })
    .onUploadComplete(({ file }) => {
      console.log('Upload profile image for user:', file.url);
    }),
};

export type OurFileRouter = typeof ourFileRouter;
