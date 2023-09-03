import { ourFileRouter } from '@/src/utils/upload';
import { createNextPageApiHandler } from 'uploadthing/next-legacy';

const handler = createNextPageApiHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
  },
});

export default handler;
