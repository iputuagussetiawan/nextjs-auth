import { auth } from '@/auth'
export const useCurrentUserAuth =async () => {
  const  session  = await auth();
  return session
};