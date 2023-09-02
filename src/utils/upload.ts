import { generateReactHelpers } from '@uploadthing/react/hooks';

import { getServerSession } from 'next-auth';
import { FileRouter, createUploadthing } from 'uploadthing/next';

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();

const f = createUploadthing();

export const ourFileRouter = {
  media: f({ image: { maxFileSize: '8MB', maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession();
      if (!session || !session.user) {
        throw new Error('Unauthorized');
      }

      return { email: session.user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload profile image for user:', metadata.email, file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
