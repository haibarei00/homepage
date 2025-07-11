import type { CloudflareResponseBody } from 'vite-plugin-cloudflare-functions/worker';

import 'vite-plugin-cloudflare-functions/client';

declare module 'vite-plugin-cloudflare-functions/client' {
  interface PagesResponseBody {
    '/api/checklive': {
      ALL: CloudflareResponseBody<typeof import('functions/api/checklive')['onRequest']>;
    };
  }
}
