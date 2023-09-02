import { createNextRouteHandler } from 'uploadthing/next';

import { customApis } from '@/src/utils/routes';
import { ourFileRouter } from '@/src/utils/upload';

const handler = createNextRouteHandler({
  router: ourFileRouter,
  config: {
    callbackUrl: customApis.imageUpload,
  },
});

export default handler;
