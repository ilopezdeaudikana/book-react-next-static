import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useCurrentPath = () => {
  const [current, setCurrent] = useState('');
  const router = useRouter();
  useEffect(() => {
    const path = router.pathname;
    const currentPath =
      path === '/projects'
        ? 'projects'
        : path.indexOf('projects') > -1
        ? ''
        : 'companies';
    setCurrent(currentPath);
  }, [router.pathname]);

  return current;
};
