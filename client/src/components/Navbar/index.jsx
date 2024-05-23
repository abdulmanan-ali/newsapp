import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper, faFootballBall, faBriefcase, faLightbulb, faPalette, faPlane, faGlobe, faPlus, faLanguage, faSignOutAlt, faBars, faPen } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../public/logo.png';

const Navbar = ({ locale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
    navigate('/login');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
    if (lng === 'en') {
      navigate('/en');
    } else if (lng === 'ur') {
      navigate('/ur');
    }
  };

  return (
    <nav className="bg-[#000] text-white flex items-center justify-between h-16 px-4 mx-auto sticky top-0 z-10">
      <div className="container mx-auto px-2">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-14 w-14" />
            <h2 className="text-xl font-bold text-gray-100 ml-3">{t("blog.Multilingual News")}</h2>
          </Link>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none focus:text-white"
              aria-label="Open Menu"
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>
          </div>
          <div className="hidden lg:flex items-center space-x-4 flex-grow justify-end">
            <div className="flex space-x-4 items-center">
              <Link to="/" className="hover:underline hover:text-red-600 flex items-center">
                <FontAwesomeIcon icon={faHome} className="mr-1" />
                {t('navbar.home')}
              </Link>
              <Link to={`/${locale}/news`} className="hover:underline hover:text-red-600 flex items-center">
                {/* <FontAwesomeIcon icon={faNewspaper} className="mr-1" /> */}
                {t('navbar.news')}
              </Link>
              <Link to={`/${locale}/sports`} className="hover:underline hover:text-red-600 flex items-center">
                {/* <FontAwesomeIcon icon={faFootballBall} className="mr-1" /> */}
                {t('navbar.sports')}
              </Link>
              <Link to={`/${locale}/business`} className="hover:underline hover:text-red-600 flex items-center">
                {/* <FontAwesomeIcon icon={faBriefcase} className="mr-1" /> */}
                {t('navbar.business')}
              </Link>
              <Link to={`/${locale}/innovation`} className="hover:underline hover:text-red-600 flex items-center">
                {/* <FontAwesomeIcon icon={faLightbulb} className="mr-1" /> */}
                {t('navbar.innovation')}
              </Link>
              <Link to={`/${locale}/culture`} className="hover:underline hover:text-red-600 flex items-center">
                {/* <FontAwesomeIcon icon={faPalette} className="mr-1" /> */}
                {t('navbar.culture')}
              </Link>
              <Link to={`/${locale}/travel`} className="hover:underline hover:text-red-600 flex items-center">
                {/* <FontAwesomeIcon icon={faPlane} className="mr-1" /> */}
                {t('navbar.travel')}
              </Link>
              <Link to={`/${locale}/earth`} className="hover:underline hover:text-red-600 flex items-center">
                {/* <FontAwesomeIcon icon={faGlobe} className="mr-1" /> */}
                {t('navbar.earth')}
              </Link>
              <Link to={`/${locale}/addarticle`} className="hover:underline hover:text-red-600 flex items-center">
                <FontAwesomeIcon icon={faPen} className="mr-1" />
                {t('navbar.addArticle')}
              </Link>
            </div>
            <div className="relative inline-block text-left ml-4" ref={languageRef}>
              <button
                type="button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="hover:underline hover:text-red-600 flex items-center"
              >
                {/* <FontAwesomeIcon icon={faLanguage} className="mr-1" /> */}
                <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                {t('navbar.language')}
              </button>
              {isLanguageOpen && (
                <div className="origin-top-right absolute right-0 mt-4 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5" ref={menuRef}>
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <button
                      onClick={() => changeLanguage('en')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      role="menuitem"
                    >
                      {t('navbar.english')}
                    </button>
                    <button
                      onClick={() => changeLanguage('ur')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      role="menuitem"
                    >
                      {t('navbar.urdu')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:flex ml-4">
            <button
              onClick={handleLogout}
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-9000"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
              {t('navbar.logout')}
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
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  {t('navbar.home')}
                </Link>
                <Link
                  to={`/${locale}/news`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faNewspaper} className="mr-1" />
                  {t('navbar.news')}
                </Link>
                <Link
                  to={`/${locale}/sports`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faFootballBall} className="mr-1" />
                  {t('navbar.sports')}
                </Link>
                <Link
                  to={`/${locale}/business`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faBriefcase} className="mr-1" />
                  {t('navbar.business')}
                </Link>
                <Link
                  to={`/${locale}/innovation`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faLightbulb} className="mr-1" />
                  {t('navbar.innovation')}
                </Link>
                <Link
                  to={`/${locale}/culture`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faPalette} className="mr-1" />
                  {t('navbar.culture')}
                </Link>
                <Link
                  to={`/${locale}/travel`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faPlane} className="mr-1" />
                  {t('navbar.travel')}
                </Link>
                <Link
                  to={`/${locale}/earth`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                  {t('navbar.earth')}
                </Link>
                <Link
                  to={`/${locale}/addarticle`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-1" />
                  {t('navbar.addArticle')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                  {t('navbar.logout')}
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



// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
// import Logo from '../../public/logo.png'

// const Navbar = ({ locale }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();

//   const menuRef = useRef();
//   const languageRef = useRef();

//   useEffect(() => {
//     const closeMenu = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         !languageRef.current.contains(event.target)
//       ) {
//         setIsMenuOpen(false);
//         setIsLanguageOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", closeMenu);

//     return () => {
//       document.removeEventListener("mousedown", closeMenu);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate('/login');
//   };

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     setIsLanguageOpen(false);
//     if (lng === 'en') {
//       navigate('/en');
//     } else if (lng === 'ur') {
//       navigate('/ur');
//     }
//   };

//   return (
//     // <nav className="bg-[#02044A] text-white flex items-center justify-between h-16 px-4 mx-auto sticky top-0 z-10">
//     <nav className="bg-[#000] text-white flex items-center justify-between h-16 px-4 mx-auto sticky top-0 z-10">
//       <div className="container mx-auto px-2">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="flex items-center">
//             <img src={Logo} alt="Logo" className="h-14 w-14" />
//             <h2 className="text-xl font-bold text-gray-100 ml-3">{t("blog.Multilingual News")}</h2>
//           </Link>

//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-white focus:outline-none focus:text-white"
//               aria-label="Open Menu"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//           <div className="hidden lg:flex space-x-4 items-center">
//             <div className="flex space-x-4">
//               <Link to="/" className="hover:underline hover:text-red-600">
//                 {t('navbar.home')}
//               </Link>
//               <Link to={`/${locale}/news`} className="hover:underline hover:text-red-600">
//                 {t('navbar.news')}
//               </Link>
//               <Link to={`/${locale}/sports`} className="hover:underline hover:text-red-600">
//                 {t('navbar.sports')}
//               </Link>
//               <Link to={`/${locale}/business`} className="hover:underline hover:text-red-600">
//                 {t('navbar.business')}
//               </Link>
//               <Link to={`/${locale}/innovation`} className="hover:underline hover:text-red-600">
//                 {t('navbar.innovation')}
//               </Link>
//               <Link to={`/${locale}/culture`} className="hover:underline hover:text-red-600">
//                 {t('navbar.culture')}
//               </Link>
//               <Link to={`/${locale}/travel`} className="hover:underline hover:text-red-600">
//                 {t('navbar.travel')}
//               </Link>
//               <Link to={`/${locale}/earth`} className="hover:underline hover:text-red-600">
//                 {t('navbar.earth')}
//               </Link>
//               <Link to={`/${locale}/addarticle`} className="hover:underline hover:text-red-600">
//                 {t('navbar.addArticle')}
//               </Link>
//             </div>
//             <div className="relative inline-block text-left" ref={languageRef}>
//               <button
//                 type="button"
//                 onClick={() => setIsLanguageOpen(!isLanguageOpen)}
//                 className="hover:underline hover:text-red-600"
//               >
//                 {t('navbar.language')}
//                 <svg
//                   className="-mr-1 ml-2 h-5 w-5"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M9 3a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 0 0-8-8zm0 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6zm1 4a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H11a1 1 0 0 0-1 1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//               {isLanguageOpen && (
//                 <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" ref={menuRef}>
//                   <div
//                     className="py-1"
//                     role="menu"
//                     aria-orientation="vertical"
//                     aria-labelledby="options-menu"
//                   >
//                     <button
//                       onClick={() => changeLanguage('en')}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                       role="menuitem"
//                     >
//                       {t('navbar.english')}
//                     </button>
//                     <button
//                       onClick={() => changeLanguage('ur')}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                       role="menuitem"
//                     >
//                       {t('navbar.urdu')}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//           </div>
//           {/* End of dropdown */}
//           <div className="hidden lg:flex">
//             <button
//               onClick={handleLogout}
//               className="bg-white text-gray-800 font-bold py-2 px-4 rounded-md"
//             >
//               {t('navbar.logout')}
//             </button>
//           </div>
//         </div>
//         {isMenuOpen && (
//           <div className="lg:hidden mt-2">
//             <div className="bg-white absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
//               <div className="py-1">
//                 <Link
//                   to="/"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.home')}
//                 </Link>
//                 <Link
//                   to={`/${locale}/news`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.news')}
//                 </Link>
//                 <Link
//                   to={`/${locale}/sports`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.sports')}
//                 </Link>
//                 <Link
//                   to={`/${locale}/business`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.business')}
//                 </Link>
//                 <Link
//                   to={`/${locale}/innovation`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.innovation')}
//                 </Link>
//                 <Link
//                   to={`/${locale}/culture`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.culture')}
//                 </Link>
//                 <Link
//                   to={`/${locale}/travel`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.travel')}
//                 </Link>
//                 <Link
//                   to={`/${locale}/earth`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.earth')}
//                 </Link>
//                 <Link
//                   to={`/${locale}/addarticle`}
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                 >
//                   {t('navbar.addArticle')}
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
//                 >
//                   {t('navbar.logout')}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;