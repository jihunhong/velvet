import { initDb } from '@/db/initDb';
import React, { useEffect } from 'react';

interface IndexedDbInitProps {
  children: React.ReactNode;
}

const IndexedDbInit: React.FC<IndexedDbInitProps> = ({ children }) => {
  useEffect(() => {
    initDb();
  }, []);

  return <>{children}</>;
};

export default IndexedDbInit;
