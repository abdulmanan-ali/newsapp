import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const menuRef = useRef();
  const languageRef = useRef();

  useEffect(() => {
    const closeMenu = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !languageRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-[#02044A] text-white flex items-center justify-between h-16 px-4 mx-auto sticky top-0 z-10">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Multilingual News</h1>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none focus:text-white"
              aria-label="Open Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex space-x-4 items-center">
            <div className="flex space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/news" className="hover:underline">
                News
              </Link>
              <Link to="/sports" className="hover:underline">
                Sports
              </Link>
              <Link to="/business" className="hover:underline">
                Business
              </Link>
              <Link to="/innovation" className="hover:underline">
                Innovation
              </Link>
              <Link to="/culture" className="hover:underline">
                Culture
              </Link>
              <Link to="/travel" className="hover:underline">
                Travel
              </Link>
              <Link to="/earth" className="hover:underline">
                Earth
              </Link>
              <Link to="/addarticle" className="hover:underline">
                Add Article
              </Link>
            </div>
            <div className="relative inline-block text-left" ref={languageRef}>
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="hover:underline"
              >
                Language
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8zm0 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6zm1 4a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H11a1 1 0 0 0-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isLanguageOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" ref={menuRef}>
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/news/en"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      English
                    </Link>
                    <Link
                      to="/news/ur"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      Urdu
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* End of dropdown */}
          <div className="hidden lg:flex">
            <button
              onClick={handleLogout}
              className="bg-white text-gray-800 font-bold py-2 px-4 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden mt-2">
            <div className="bg-white absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Home
                </Link>
                <Link
                  to="/news"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  News
                </Link>
                <Link
                  to="/sports"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Sports
                </Link>
                <Link
                  to="/business"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Business
                </Link>
                <Link
                  to="/innovation"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Innovation
                </Link>
                <Link
                  to="/culture"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Culture
                </Link>
                <Link
                  to="/travel"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Travel
                </Link>
                <Link
                  to="/earth"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Earth
                </Link>
                <Link
                  to="/addarticle"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Add Article
                </Link>
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    Language
                    <svg
                      className="-mr-1 ml-2 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8zm0 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6zm1 4a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H11a1 1 0 0 0-1 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isLanguageOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link
                          to="/news/en"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          English
                        </Link>
                        <Link
                          to="/news/ur"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Urdu
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;








// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
//   };

//   return (
//     <div className='w-full h-[100px] m-auto z-10 fixed'> {/* Main container */}
//       <nav className="bg-[#02044A] text-white flex items-center justify-between h-16 px-4 mx-auto">
//         <h1 className="text-xl font-bold">Multilingual News</h1>
//         <div className="flex space-x-4">
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/news" className="hover:underline">News</Link>
//           <div className="relative inline-block text-left">
//             <div>
//               <button type="button" className="hover:underline">
//                 Language
//                 <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                   <path fillRule="evenodd" d="M9 3a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8zm0 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6zm1 4a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H11a1 1 0 0 0-1 1z" clipRule="evenodd" />
//                 </svg>
//               </button>
//             </div>
//             <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//               <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                 <Link to="/news/en" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">English</Link>
//                 <Link to="/news/ur" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Urdu</Link>
//               </div>
//             </div>
//           </div>
//           <a href="/sport" className="hover:underline">Sport</a>
//           <a href="/earth" className="hover:underline">Earth</a>
//           <a href="/worklife" className="hover:underline">Worklife</a>
//           <a href="/travel" className="hover:underline">Travel</a>
//           <a href="/culture" className="hover:underline">Culture</a>
//         </div>
//         <button onClick={handleLogout} className="bg-white text-gray-800 font-bold py-2 px-4 rounded-md">
//           Logout
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;



// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
//   };

//   return (
//     <div className='w-full h-[100px] m-auto z-10 fixed'> {/* Main container */}
//       <nav className="bg-[#02044A] text-white flex items-center justify-between h-16 px-4 mx-auto">
//         <h1 className="text-xl font-bold">Multilingual News</h1>
//         <div className="flex space-x-4">
//           <Link to="/" className="hover:underline">Home</Link>
//           <Link to="/news" className="hover:underline">News</Link>
//           <a href="/sport" className="hover:underline">Sport</a>
//           <a href="/earth" className="hover:underline">Earth</a>
//           <a href="/worklife" className="hover:underline">Worklife</a>
//           <a href="/travel" className="hover:underline">Travel</a>
//           <a href="/culture" className="hover:underline">Culture</a>
//         </div>
//         <button onClick={handleLogout} className="bg-white text-gray-800 font-bold py-2 px-4 rounded-md">
//           Logout
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;





// import styles from "./styles.module.css";
// import { Link } from "react-router-dom"

// const Navbar = () => {
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         window.location.reload();
//     };

//     return (
//         <div className={styles.main_container}>
//             <nav className={styles.navbar}>
//                 <h1>Multilingual News</h1>
//                 <div>
//                     <Link to="/" className={styles.nav_link}>Home</Link>
//                     <Link to="/news" className={styles.nav_link}>News</Link>
//                     <a href="/news" className={styles.nav_link}>News</a>
//                     <a href="/sport" className={styles.nav_link}>Sport</a>
//                     <a href="/earth" className={styles.nav_link}>Earth</a>
//                     <a href="/worklife" className={styles.nav_link}>Worklife</a>
//                     <a href="/travel" className={styles.nav_link}>Travel</a>
//                     <a href="/culture" className={styles.nav_link}>Culture</a>
//                     <button className={styles.white_btn} onClick={handleLogout}>
//                         Logout
//                     </button>
//                 </div>
//             </nav>
//         </div>
//     );
// };

// export default Navbar;