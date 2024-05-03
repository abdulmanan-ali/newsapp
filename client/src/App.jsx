import { Route, Routes, Navigate } from "react-router-dom";
// import axios from 'axios'
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BlogContentPage } from "./pages";
import useFetch from './hooks/useFetch'
import AddArticle from "./components/AddArticle";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Sports from "./components/Sports";
import Earth from "./components/Earth";
import { Blogs } from "./components";
import News from "./components/News";
import Innovation from "./components/Innovation";
import Business from "./components/Business";
import Culture from "./components/Culture";
import Travel from "./components/Travel";



function App() {


  let { loading, blogData, error } = useFetch('http://localhost:1337/api/blogs?populate=*');
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  // const [categories, setCategories] = useState([]); // State for categories
  // const [blogs, setBlogs] = useState(null); // Placeholder for blogs

  // useEffect(() => {
  //   const fetchCategories = async () => { // Fetch categories on mount
  //     const response = await axios.get('http://localhost:1337/api/categories');
  //     setCategories(response.blogdata);
  //   };

  //   fetchCategories();
  // }, []);



  const user = localStorage.getItem("token");

  return (
    <>
      <Navbar />  {/* Pass categories to Navbar */}
      <div className="App">
        <ToastContainer />
        <Routes>
          {/* {user && <Route path="/" exact element={<Blogs />} />}
          {user && <Route path="/sports" exact element={<Sports />} />}
          {user && <Route path="/earth" exact element={<Earth />} />}
          {user && <Route path="/news" exact element={<News />} />}
          {user && <Route path="/innovation" exact element={<Innovation />} />} */}
          {/* {user && <Route path="/Earth" exact element={<Homepage blogs={data ? data : ""} />} />} */}
          {user && <Route path="/addarticle" exact element={<AddArticle />} />}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/logout" exact element={<Login />} />
          {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
          <Route path="/addarticle" element={<Navigate replace to="/login" />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/Sports" element={<Sports />} />
          <Route path="/news" element={<News />} />
          <Route path="/earth" element={<Earth />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/business" element={<Business />} />
          {/* <Route path='/' element={<Homepage blogs={data ? data : ""} />}></Route> */}
          <Route path='/news/en/:slug' element={<BlogContentPage blogs={blogData ? blogData : ""} />}></Route>
          {/* <Route path="/category/:categoryId" element={<BlogContentPage blogs={data ? data : ""} />} />   */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;





// import { Route, Routes, Navigate } from "react-router-dom";
// import axios from 'axios'
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import { Homepage, BlogContentPage } from "./pages";
// import useFetch from './hooks/useFetch'
// import AddArticle from "./components/AddArticle";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer"
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useState, useEffect } from 'react';



// function App() {


// 	// const [categories, setCategories] = useState([]);
// 	// const [blogs, setBlogs] = useState(null); // Placeholder for blogs

// 	// useEffect(() => {
// 	// 	const fetchCategories = async () => {
// 	// 		const response = await axios.get('http://localhost:1337/api/categories');
// 	// 		setCategories(response.data);
// 	// 	};

// 	// 	fetchCategories();
// 	// }, []);


// 	// let { loading, data, error } = useFetch('http://localhost:1337/api/blogs?populate=*')
// let { loading, data, error } = useFetch('http://localhost:1337/api/blogs?populate=*&filters[categories][Name][$eq]=Sports')
// if (loading) return <p>Loading...</p>
// if (error) return <p>Error!</p>


// 	// );
// 	const user = localStorage.getItem("token");

// 	return (
// 		<>

// 			<Navbar />
// <div className="App">
// 	<ToastContainer />
// 	<Routes>
// 		{user && <Route path="/" exact element={<Homepage blogs={data ? data : ""} />} />}
// 		<Route path="/signup" exact element={<Signup />} />
// 		<Route path="/login" exact element={<Login />} />
// 		<Route path="/addarticle" exact element={<AddArticle />} />
// 		<Route path="/" element={<Navigate replace to="/login" />} />
// 		{/* <Route path='/' element={<Homepage blogs={data ? data : ""} />}></Route> */}
// 		<Route path='/news/en/:id' element={<BlogContentPage blogs={data ? data : ""} />}></Route>
// 	</Routes>
// </div>
// 			<Footer />
// 		</>
// 	);
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Blogs from './components/Blogs';
// import BlogContent from './components/BlogContent';
// import Homepage from './pages/Homepage';

// function App() {
// 	const [blogs, setBlogs] = useState(null);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	// Assuming you have a useFetch hook that fetches blogs data
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			setLoading(true);
// 			try {
// 				const response = await fetch('http://localhost:1337/api/blogs?populate=*'); // Replace with your API endpoint
// 				const data = await response.json();
// 				setBlogs(data);
// 			} catch (error) {
// 				setError(error);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchData();
// 	}, []);

// 	return (
// 		// <Router>
// 			<Routes>
// 				<Route path="/" element={<Homepage />} />
// 				<Route path="/blog/:id" element={<BlogContent blogs={blogs} />} />
// 			</Routes>
// 		// </Router>
// 	);
// }

// export default App;
