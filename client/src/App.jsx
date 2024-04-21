import { Route, Routes, Navigate } from "react-router-dom";
// import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Homepage, BlogContentPage } from "./pages";
import useFetch from './hooks/useFetch'
import AddArticle from "./components/AddArticle";
import Navbar  from "./components/Navbar";
import Footer from "./components/Footer"
// import { useTranslation } from 'i18n';
function App() {

	// const { t } = useTranslation();

	let { loading, data, error } = useFetch('http://localhost:1337/api/blogs?populate=*')
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error!</p>


	// const notify = () => toast("Wow so easy!");

	// return (
	//   <div>
	// 	<button onClick={notify}>Notify!</button>
	// 	<ToastContainer />
	//   </div>
	// );
	const user = localStorage.getItem("token");

	return (
		<>

			<Navbar />
			<Routes>
				{user && <Route path="/" exact element={<Homepage blogs={data ? data : ""} />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/addarticle" exact element={<AddArticle />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
				{/* <Route path='/' element={<Homepage blogs={data ? data : ""} />}></Route> */}
				<Route path='/blog/:id' element={<BlogContentPage blogs={data ? data : ""} />}></Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;

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
