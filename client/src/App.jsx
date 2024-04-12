import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Homepage, BlogContentPage } from "./pages";
import useFetch from './hooks/useFetch'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
	let {loading, data, error} =useFetch('http://localhost:1337/api/blogs?populate=*')
	if(loading) return <p>Loading...</p>
	if(error) return <p>Error!</p>
	// const notify = () => toast("Wow so easy!");

	// return (
	//   <div>
	// 	<button onClick={notify}>Notify!</button>
	// 	<ToastContainer />
	//   </div>
	// );
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Homepage blogs={data ? data : ""}/>} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			{/* <Route path='/' element={<Homepage blogs={data ? data : ""} />}></Route> */}
			<Route path='/blog/:id' element={<BlogContentPage blogs={data ? data : ""} />}></Route>
		</Routes>
	);
}

export default App;
