import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import teen from "./teen.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);
  const router = useRouter();

  const handleNav = () => {
    setNav(!nav);
  };

  const navigateTo = (path) => {
    router.push(path);
    setNav(false);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <div
      className={
        shadow
          ? "fixed w-full h-20 shadow-xl shadow-[#e8c284] z-[100]"
          : "fixed w-full h-20  z-[100]"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 bg-[#f3efde]">
        <div>
          <Image
            src={teen}
            width="70"
            height="70"
            alt="/"
          />
        </div>
        <div>
          <ul className="hidden md:flex">
            <li
              className="ml-10 text-sm uppercase hover:border-b cursor-pointer"
              onClick={() => navigateTo('/')}
            >
              Home
            </li>
            <li
              className="ml-10 text-sm uppercase hover:border-b cursor-pointer"
              onClick={() => navigateTo('/sign-in')}
            >
              Sign in
            </li>

          </ul>
          <div onClick={handleNav} className="md:hidden">
            <AiOutlineMenu size={25} />
          </div>
        </div>
      </div>

      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
        }
      >
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-gradient-to-tl from-[#FAF8F1] to-[#FAEAB1] p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between">
              <div>
                <Image
                  src={teen}
                  width="70"
                  height="70"
                  alt="/"
                />
              </div>

              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-[#e8c284] p-3 cursor-pointer"
              >
                <AiOutlineClose />
              </div>
            </div>
            <div className="border-b border-[#e8c284] my-4">
              <p className="w-[85%] md:w-[90%] py-4">
                Join me build something legendary together
              </p>
            </div>
          </div>
          <div className="py-4 flex flex-col">
            <ul className="uppercase">
              <li
                onClick={() => navigateTo('/')}
                className="py-4 text-sm cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigateTo('sign-in')}
                className="py-4 text-sm cursor-pointer"
              >
                About
              </li>
            </ul>
            <div className="py-4">
              <p className="uppercase tracking-widest text-[#C58940]">
                Let us Connect
              </p>
              <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
                <div className="rounded-full shadow-lg shadow-[#e8c284] p-3 cursor-pointer hover:scale-105 ease-in duration-500">
                  <FaFacebook />
                </div>
                <div className="rounded-full shadow-lg shadow-[#e8c284]  p-3 cursor-pointer hover:scale-105 ease-in duration-500">
                  <FaGithub />
                </div>
                <div className="rounded-full shadow-lg shadow-[#e8c284] p-3 cursor-pointer hover:scale-105 ease-in duration-500">
                  <AiOutlineMail />
                </div>
                <div className="rounded-full shadow-lg shadow-[#e8c284] p-3 cursor-pointer hover:scale-105 ease-in duration-500">
                  <BsFillPersonLinesFill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;








// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from "react-icons/ai";
// import { FaFacebook, FaGithub } from "react-icons/fa";
// import { BsFillPersonLinesFill } from "react-icons/bs";
// import teen from "./teen.png"

// const Navbar = () => {
//   const [nav, setNav] = useState(false);
//   const [shadow, setShadow] = useState(false);

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   useEffect(() => {
//     const handleShadow = () => {
//       if (window.scrollY >= 90) {
//         setShadow(true);
//       } else {
//         setShadow(false);
//       }
//     };
//     window.addEventListener("scroll", handleShadow);
//   }, []);

//   return (
//     <div
//       className={
//         shadow
//           ? "fixed w-full h-20 shadow-xl shadow-[#e8c284] z-[100]"
//           : "fixed w-full h-20  z-[100]"
//       }
//     >
//       <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 bg-[#f3efde]">
//         <div>
//           <Image
//             src={teen}
//             width="70"
//             height="70"
//             alt="/"
//           />
//         </div>
//         <div>
//           <ul className="hidden md:flex">
//             <Link href="/">
//               <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
//             </Link>
//             <Link href="/#about">
//               <li className="ml-10 text-sm uppercase hover:border-b">About</li>
//             </Link>
//             <Link href="/#skills">
//               <li className="ml-10 text-sm uppercase hover:border-b">Skills</li>
//             </Link>
//             <Link href="/#projects">
//               <li className="ml-10 text-sm uppercase hover:border-b">
//                 Projects
//               </li>
//             </Link>
//             <Link href="/#contact">
//               <li className="ml-10 text-sm uppercase hover:border-b">
//                 Contact
//               </li>
//             </Link>
//           </ul>
//           <div onClick={handleNav} className="md:hidden">
//             <AiOutlineMenu size={25} />
//           </div>
//         </div>
//       </div>

//       <div
//         className={
//           nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
//         }
//       >
//         <div
//           className={
//             nav
//               ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-gradient-to-tl from-[#FAF8F1] to-[#FAEAB1] p-10 ease-in duration-500"
//               : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
//           }
//         >
//           <div>
//             <div className="flex w-full items-center justify-between">
//               <div>
//                 <Image
//                   src={teen}
//                   width="70"
//                   height="70"
//                   alt="/"
//                 />
//               </div>

//               <div
//                 onClick={handleNav}
//                 className="rounded-full shadow-lg shadow-[#e8c284] p-3 cursor-pointer"
//               >
//                 <AiOutlineClose />
//               </div>
//             </div>
//             <div className="border-b border-[#e8c284] my-4">
//               <p className="w-[85%] md:w-[90%] py-4">
//                 Join me build something legendary together
//               </p>
//             </div>
//           </div>
//           <div className="py-4 flex flex-col">
//             <ul className="uppercase">
//               <Link href="/">
//                 <li onClick={() => setNav(false)} className="py-4 text-sm">
//                   Home
//                 </li>
//               </Link>
//               <Link href="/#about">
//                 <li onClick={() => setNav(false)} className="py-4 text-sm">
//                   About
//                 </li>
//               </Link>
//               <Link href="/#skills">
//                 <li onClick={() => setNav(false)} className="py-4 text-sm">
//                   Skills
//                 </li>
//               </Link>
//               <Link href="/#projects">
//                 <li onClick={() => setNav(false)} className="py-4 text-sm">
//                   Projects
//                 </li>
//               </Link>
//               <Link href="/#contact">
//                 <li onClick={() => setNav(false)} className="py-4 text-sm">
//                   Contact
//                 </li>
//               </Link>
//             </ul>
//             <div className="py-4">
//               <p className="uppercase tracking-widest text-[#C58940]">
//                 Let us Connect
//               </p>
//               <div className="flex items-center justify-between my-4 w-full sm:w-[80%]">
//                 <div className="rounded-full shadow-lg shadow-[#e8c284] p-3 cursor-pointer hover:scale-105 ease-in duration-500">
//                   <FaFacebook />
//                 </div>
//                 <div className="rounded-full shadow-lg shadow-[#e8c284]  p-3 cursor-pointer hover:scale-105 ease-in duration-500">
//                   <FaGithub />
//                 </div>
//                 <div className="rounded-full shadow-lg shadow-[#e8c284] p-3 cursor-pointer hover:scale-105 ease-in duration-500">
//                   <AiOutlineMail />
//                 </div>
//                 <div className="rounded-full shadow-lg shadow-[#e8c284] p-3 cursor-pointer hover:scale-105 ease-in duration-500">
//                   <BsFillPersonLinesFill />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;