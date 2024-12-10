import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    user: null // Replace with actual user data
  };
}) satisfies PageServerLoad; 