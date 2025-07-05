'use client';

import { useUserSync } from '../hooks/useUserSync';

export default function UserSync() {
  // This component doesn't render anything, it just handles user syncing
  useUserSync();
  
  return null;
} 