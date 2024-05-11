import React from "react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#000] text-gray-300 py-8 px-4 ">
    {/* <footer className="bg-[#02044A] text-gray-300 py-8 px-4 "> */}
      <div className="container mx-auto flex flex-col justify-between items-center">
        <div className="flex flex-row space-x-4">
          <a href="#" className="text-white hover:text-blue-500">{t('footer.aboutUs')}</a>
          <a href="#" className="text-white hover:text-blue-500">{t('footer.contactUs')}</a>
          <a href="#" className="text-white hover:text-blue-500">{t('footer.privacyPolicy')}</a>
        </div>
        <div className="flex flex-row space-x-4 mt-4">
          <a href="#" className="text-white hover:text-blue-500">{t('footer.facebook')}</a>
          <a href="#" className="text-white hover:text-blue-500">{t('footer.twitter')}</a>
          <a href="#" className="text-white hover:text-blue-500">{t('footer.instagram')}</a>
        </div>
        <p className="text-center mt-4 text-sm">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;



// import React from "react";
// import styles from "./styles.module.css"; // Assuming you have CSS module for styling

// const Footer = () => {
//     return (
//         // <div className="flex flex-col min-h-screen">
//         //     <main className="flex-grow px-4 py-8">
//         <div className="main-container">
//             {/* Your main content goes here */}

//             <footer className={styles.footer}>
//                 <div className={styles.footer_content}>
//                     <div className={styles.footer_links}>
//                         <a href="#" className={styles.footer_link}>About Us</a>
//                         <a href="#" className={styles.footer_link}>Contact Us</a>
//                         <a href="#" className={styles.footer_link}>Privacy Policy</a>
//                     </div>
//                     <div className={styles.footer_social}>
//                         <a href="#" className={styles.social_link}>Facebook</a>
//                         <a href="#" className={styles.social_link}>Twitter</a>
//                         <a href="#" className={styles.social_link}>Instagram</a>
//                     </div>
//                 </div>
//                 <div className={styles.footer_bottom}>
//                     <p>&copy; 2024 Multilingual News. All Rights Reserved.</p>
//                 </div>
//             </footer>
//         </div>
//         //     </main>
//         // </div>


//     );

// };

// export default Footer;

// import React from 'react';
// // import {FaFacebook, FaGithub, FaInstagram, FaTwitter, FaTwitch} from 'react-icons/fa';


// const Footer = () => {
//     return (
//         <div className='w-full bg-[#02044A] text-gray-300 py-8 px-2'>
//             <div className='max-w-[1240px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8'>
//                 <div>
//                     <h6 className='font-bold uppercase py-2'>Solutions</h6>
//                     <ol>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                     </ol>
//                 </div>
//                 <div>
//                     <h6 className='font-bold uppercase py-2'>Solutions</h6>
//                     <ol>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                     </ol>
//                 </div>
//                 <div>
//                     <h6 className='font-bold uppercase py-2'>Solutions</h6>
//                     <ol>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                     </ol>
//                 </div>
//                 <div>
//                     <h6 className='font-bold uppercase py-2'>Solutions</h6>
//                     <ol>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                         <li className='py-1'>Marketing</li>
//                     </ol>
//                 </div>

//                 <div className='col-span-2 pt-2 md:pt-2'>
//                     <p className='font-bold uppercase'>Subscribe To Our Newsletter</p>
//                     <p className='py-4'>The latest news, articles, and resources
//                         sent to your inbox weekly.
//                     </p>
//                     <form className='flex flex-col sm:flex-row'>
//                         <input className='w-full p-2 mr-4 rounded-md  mb-2' type="email" placeholder="Enter email" />
//                         <button className='p-2 mb-2 bg-[#00B86E] '>Subscribe</button>

//                     </form>

//                 </div>

//             </div>

//             <div className='flex flex-col max-w-[1240px] px-2 py-4 m-auto justify-between sm:flex-row text-center text-gray-500 items-center'>
//                 <p>2022 CWTS, LLC. All rights reserved.</p>
//                 {/* <div className='flex justify-between sm:w-[300px] pt-4 text-2xl gap-2'>
//                 <FaFacebook />
//                 <FaGithub />
//                 <FaInstagram />
//                 <FaTwitch />
//                 <FaTwitter />

//             </div> */}

//             </div>
//         </div>
//     )
// }

// export default Footer
