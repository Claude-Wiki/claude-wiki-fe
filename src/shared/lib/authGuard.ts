import { checkIsAdmin } from '@/domains/admin/auth/model/authModel';

export const requireAdmin = async (navigate: (path: string) => void): Promise<boolean> => {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    navigate('/admin');
    return false;
  }
  return true;
};
