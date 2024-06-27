import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useLayoutEffect, useState, useMemo } from "react";
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
import Loading from "./components/Loading";
import ServerError from "./components/ServerError";

function App() {

  const location = useLocation();

  const [locale, setLocale] = useState(
    localStorage.getItem("locale") || "en" // Check localStorage first
  ); // Default to English

  useEffect(() => {
    const smoothScrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(smoothScrollToTop);
        window.scrollTo(0, c - c / 12); // Adjust the 12 to control scroll speed
      }
    };
  
    smoothScrollToTop();
  }, [location]);

  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll to top on route change
  // }, [location]);

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

  const user = localStorage.getItem("token");

  if (loading) return <> <Loading /> </>;
  if (error) return <> <ServerError /> </>;


  return (
    <>
      <Navbar locale={locale} />
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          {user && <Route path="/:locale/addarticle" exact element={<AddArticle locale={locale} />} />}
          <Route path="/:locale/addarticle" element={<Navigate to={`/login`} />} />
          <Route path="/" element={<Navigate to={`/${locale}`} />} />
          <Route path="/:locale" element={<Blogs locale={locale} blogData={blogData} />} />
          <Route path="/:locale/sports" element={<Sports locale={locale} />} />
          <Route path="/:locale/news" element={<News locale={locale} />} />
          <Route path="/:locale/earth" element={<Earth locale={locale} />} />
          <Route path="/:locale/innovation" element={<Innovation locale={locale} />} />
          <Route path="/:locale/culture" element={<Culture locale={locale} />} />
          <Route path="/:locale/travel" element={<Travel locale={locale} />} />
          <Route path="/:locale/business" element={<Business locale={locale} />} />
          <Route path='/:locale/:category/:slug' element={<BlogContentPage blogs={blogData ? blogData : ""} />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

