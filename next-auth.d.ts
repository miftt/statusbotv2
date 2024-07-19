/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string | undefined;
    } & Session['user'];
  }
}