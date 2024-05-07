import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { BlogContentPage } from "./pages";
import { Blogs } from "./components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddArticle from "./components/AddArticle";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Sports from "./components/Sports";
import Earth from "./components/Earth";
import News from "./components/News";
import Innovation from "./components/Innovation";
import Business from "./components/Business";
import Culture from "./components/Culture";
import Travel from "./components/Travel";
import useFetch from "./hooks/useFetch";

function App() {
  const location = useLocation();
  const [locale, setLocale] = useState(
    localStorage.getItem("locale") || "en" // Check localStorage first
  ); // Default to English

  useEffect(() => {
    const path = location.pathname.split("/");
    const currentLocale = path[1] || locale; // Use current locale if set
    setLocale(currentLocale);
    localStorage.setItem("locale", currentLocale); // Store in localStorage
  }, [location]);

  const { loading, blogData, error } = useFetch(
    `http://localhost:1337/api/blogs?populate=*&locale=${locale}`,
    locale
  );


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      <Navbar locale={locale} />
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/addarticle" element={<AddArticle />} />
          <Route path="/" element={<Navigate to={`/${locale}`} />} />
          <Route path="/:locale" element={<Blogs locale={locale} blogData={blogData} />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/:locale/news" element={<News locale={locale} />} />
          <Route path="/earth" element={<Earth />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/business" element={<Business />} />
          <Route path='/:locale/:category/:slug' element={<BlogContentPage blogs={blogData ? blogData : ""} />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;








// import { Route, Routes, Navigate } from "react-router-dom";
// // import axios from 'axios'
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import { BlogContentPage } from "./pages";
// import useFetch from './hooks/useFetch'
// import AddArticle from "./components/AddArticle";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer"
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useState, useEffect } from 'react';
// import Sports from "./components/Sports";
// import Earth from "./components/Earth";
// import { Blogs } from "./components";
// import News from "./components/News";
// import Innovation from "./components/Innovation";
// import Business from "./components/Business";
// import Culture from "./components/Culture";
// import Travel from "./components/Travel";



// function App() {


//   let { loading, blogData, error } = useFetch('http://localhost:1337/api/blogs?populate=*');
//   if (loading) return <p>Loading...</p>
//   if (error) return <p>Error!</p>



//   const user = localStorage.getItem("token");

//   return (
//     <>
//       <Navbar />  {/* Pass categories to Navbar */}
//       <div className="App">
//         <ToastContainer />
//         <Routes>
//           {/* {user && <Route path="/" exact element={<Blogs />} />}
//           {user && <Route path="/sports" exact element={<Sports />} />}
//           {user && <Route path="/earth" exact element={<Earth />} />}
//           {user && <Route path="/news" exact element={<News />} />}
//           {user && <Route path="/innovation" exact element={<Innovation />} />} */}
//           {/* {user && <Route path="/Earth" exact element={<Homepage blogs={data ? data : ""} />} />} */}
//           {user && <Route path="/addarticle" exact element={<AddArticle />} />}
//           <Route path="/signup" exact element={<Signup />} />
//           <Route path="/login" exact element={<Login />} />
//           <Route path="/logout" exact element={<Login />} />
//           {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
//           <Route path="/addarticle" element={<Navigate replace to="/login" />} />
//           <Route path="/" element={<Blogs />} />
//           <Route path="/en" element={<Blogs />} />
//           <Route path="/sports" element={<Sports />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/earth" element={<Earth />} />
//           <Route path="/innovation" element={<Innovation />} />
//           <Route path="/culture" element={<Culture />} />
//           <Route path="/travel" element={<Travel />} />
//           <Route path="/business" element={<Business />} />
//           {/* <Route path='/' element={<Homepage blogs={data ? data : ""} />}></Route> */}
//           <Route path='/:locale/:category/:slug' element={<BlogContentPage blogs={blogData ? blogData : ""} />}></Route>
//           {/* <Route path="/category/:categoryId" element={<BlogContentPage blogs={data ? data : ""} />} />   */}
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;