import { auth } from '@/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
          setUser(user);
          console.log("User: ", user);
          setPending(false);
        });
        return () => unsubscribe();
      }, [user]);

  return {user, pending}
}

export default useAuth
