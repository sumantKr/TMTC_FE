export const API_URL = typeof window === 'undefined'
  ? process.env.INTERNAL_URL // server-side
  : process.env.NEXT_PUBLIC_API_URL; // client-side
