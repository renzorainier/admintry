import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/firebase/config';
import { useRouter } from 'next/navigation.js';
import { collection, getDocs } from 'firebase/firestore';
import Dashboard from './Dashboard'; // Import your Dashboard component

export default function Main() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const userSession = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;
  const adminUID = 'qFFVjtC9KSWip3AID3IEFz5UrUO2'; // Admin UID

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user && !userSession) {
        router.push('/sign-in');
        return;
      }

      // Ensure only the admin UID can proceed
      if (user && user.uid !== adminUID) {
        console.error('Access denied. Only admin can access this.');
        router.push('/error'); // Redirect to error page for unauthorized access
        return;
      }

      try {
        // Fetch all documents in the "users" collection
        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);

        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push(doc.data());
        });

        setUserData(usersData); // Set state with all users' data

        console.log('Fetched user data:', usersData); // Log fetched data to console
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchUserData();
  }, [user, userSession, router]);

  return (
    <main className="flex min-h-screen flex-col bg-[#031525]  justify-between">      {/* Render Dashboard component with userData passed as prop */}
      {userData && <Dashboard userData={userData} />}
    </main>
  );
}



//working wed 1;35
// import { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '@/app/firebase/config';
// import { useRouter } from 'next/navigation.js';
// import { signOut } from 'firebase/auth';
// import { doc, onSnapshot } from 'firebase/firestore'; // Changed import to include onSnapshot
// import Attendance from './Attendance.jsx';
// import MockAttendanceGenerator from './MockAttendanceGenerator.jsx';

// export default function Main() {
//   const [user] = useAuthState(auth);
//   const [userData, setUserData] = useState(null);
//   const router = useRouter();
//   const userSession = typeof window !== 'undefined' ? sessionStorage.getItem('user') : null;

//   useEffect(() => {
//     if (!user && !userSession) {
//       router.push('/sign-in');
//     } else if (user) {
//       const userDocRef = doc(db, 'users', user.uid);

//       // Set up listener for real-time updates
//       const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
//         if (docSnapshot.exists()) {
//           setUserData(docSnapshot.data());
//         } else {
//           console.error('No user data found');
//         }
//       });

//       return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
//     }
//   }, [user, userSession, router]);

//   return (
//     <main className="flex min-h-screen flex-col bg-[#031525] items-center justify-between">
//       <Attendance userData={userData} />
//       {/* <MockAttendanceGenerator /> */}

//     </main>
//   );
// }






//working thursday 4:23

// 'use client';
// import { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '@/app/firebase/config';
// import { useRouter } from 'next/navigation.js';
// import { signOut } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import Attendance from './Attendance.jsx';
// import MockAttendanceGenerator from './MockAttendanceGenerator.jsx';

// export default function Main() {
//   const [user] = useAuthState(auth);
//   const [userData, setUserData] = useState(null);
//   const router = useRouter();
//   const userSession = sessionStorage.getItem('user');

//   useEffect(() => {
//     if (!user && !userSession) {
//       router.push('/sign-in');
//     } else if (user) {
//       const fetchUserData = async () => {
//         try {
//           const userDocRef = doc(db, 'users', user.uid);
//           const userDoc = await getDoc(userDocRef);
//           if (userDoc.exists()) {
//             setUserData(userDoc.data());
//           } else {
//             console.error('No user data found');
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       };

//       fetchUserData();
//     }
//   }, [user, userSession, router]);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between">
//       <Attendance userData={userData} />
//       <MockAttendanceGenerator />
//       <button
//         onClick={() => {
//           signOut(auth);
//           sessionStorage.removeItem('user');
//           router.push('/sign-in');
//         }}
//       >
//         Log out
//       </button>
//     </main>
//   );
// }






































// 'use client';

// import { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '@/app/firebase/config';
// import { useRouter } from 'next/navigation.js';
// import { signOut } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import Attendance from './Attendance.jsx';
// import MockAttendanceGenerator from './MockAttendanceGenerator.jsx';

// export default function Main() {
//   const [user] = useAuthState(auth);
//   const [userData, setUserData] = useState(null);
//   const [userSession, setUserSession] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const sessionUser = sessionStorage.getItem('user');
//       setUserSession(sessionUser);
//     }
//   }, []);

//   useEffect(() => {
//     if (!user && !userSession) {
//       router.push('/sign-in');
//     } else if (user) {
//       const fetchUserData = async () => {
//         try {
//           const userDocRef = doc(db, 'users', user.uid);
//           const userDoc = await getDoc(userDocRef);
//           if (userDoc.exists()) {
//             setUserData(userDoc.data());
//           } else {
//             console.error('No user data found');
//           }
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       };

//       fetchUserData();
//     }
//   }, [user, userSession, router]);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between">
//       <Attendance userData={userData} />
//       <MockAttendanceGenerator />
//       <button
//         onClick={() => {
//           signOut(auth);
//           sessionStorage.removeItem('user');
//           router.push('/sign-in');
//         }}
//       >
//         Log out
//       </button>
//     </main>
//   );
// }
