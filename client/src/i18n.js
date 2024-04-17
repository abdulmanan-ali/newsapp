import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define fallback language (replace with your default language)
const fallbackLng = 'en'; 

i18n
  .use(Backend) // load translations from backend (Strapi)
  .use(LanguageDetector) // detect user language from browser settings
  .use(initReactI18next) // pass i18next instance to react-i18next
  .init({
    fallbackLng,
    interpolation: {
      escapeValue: false, // react already handles escaping
    },
  });

export default i18n;


// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

// // Define fallback language
// const fallbackLng = 'en'; 

// i18n
//   .use(Backend) // load translations from the server
//   .use(LanguageDetector) // detect user language
//   .use(initReactI18next) // pass i18next instance to react-i18next
//   .init({
//     fallbackLng,
//     interpolation: {
//       escapeValue: false, // react already handles escaping
//     },
//   });

// export default i18n;




// import i18n, { init } from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { initReactI18next } from 'i18next';


// i18n.use(LanguageDetector).use(initReactI18next).init({
//     debug: true,
//     lng: "en",
//     resources: {
//         en: {
//             translation: {
//                 greeting: "Hello, Welcome",
//             }

//         },
//         ur: {
//             translation: {

//             }

//         },
//         fr: {
//             translation: {

//             }

//         }
//     }
// })