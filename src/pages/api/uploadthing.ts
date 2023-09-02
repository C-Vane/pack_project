import { customApis } from '@/src/utils/routes';
import { ourFileRouter } from '@/src/utils/upload';
import { createNextPageApiHandler } from 'uploadthing/next-legacy';

const handler = createNextPageApiHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: customApis.imageUpload,
  },
});

export default handler;
