// 'use client';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Attendance from "./Attendance.jsx"
import MockAttendanceGenerator from "./MockAttendanceGenerator.jsx"


export default function Main() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');

  useEffect(() => {
    if (!user && !userSession) {
      router.push('/sign-in');
    } else if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);  // Ensure this is correct
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();

    }
  }, [user, userSession, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <button
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem('user');
          router.push('/sign-in');
        }}
      >
        Log out
      </button>
    <Attendance userData={userData}/>
    <MockAttendanceGenerator/>[]
    </main>
  );
}