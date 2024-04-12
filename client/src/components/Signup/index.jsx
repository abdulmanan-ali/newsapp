import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css"; // Assuming CSS file for styling

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:1337/api/auth/local/register";
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data: res } = await axios.post(url, data, config);
      setIsVerified(res.isVerified); // Assuming backend sends verification status

      if (res.isVerified) {
        navigate("/login");
      } else {
        setError("Please check your email to verify your account.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status >= 400) {
        setError(error.response.data.message || "Registration failed. Please check your inputs.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {isVerified ? (
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            ) : (
              <button type="submit" className={styles.green_btn}>
                Sign Up
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;


// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";
// import { toast } from "react-toastify";

// const Signup = () => {
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = ({ currentTarget: input }) => {
//     setData({ ...data, [input.name]: input.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = "http://localhost:1337/api/auth/local/register";
//       const config = {
//         headers: { "Content-Type": "application/json" },
//       };

//       const { data: res } = await axios.post(url, data, config);
//       // if (!!res) {
//       //   toast.success("Registered successfully! Check your email for verification.", {
//       //     hideProgressBar: true,
//       //   });
//       // }
//       navigate("/login");
//     } catch (error) {
//       console.error(error);
//       setError(error.response?.data?.message || "Registration failed. Please check your inputs.");
//     }
//   };

//   return (
//     <div className={styles.signup_container}>
//       <div className={styles.signup_form_container}>
//         <div className={styles.left}>
//           <h1>Welcome Back</h1>
//           <Link to="/login">
//             <button type="button" className={styles.white_btn}>
//               Sign in
//             </button>
//           </Link>
//         </div>
//         <div className={styles.right}>
//           <form className={styles.form_container} onSubmit={handleSubmit}>
//             <h1>Create Account</h1>
//             <input
//               type="text"
//               placeholder="First Name"
//               name="username"
//               onChange={handleChange}
//               value={data.username}
//               required
//               className={styles.input}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               name="email"
//               onChange={handleChange}
//               value={data.email}
//               required
//               className={styles.input}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               name="password"
//               onChange={handleChange}
//               value={data.password}
//               required
//               className={styles.input}
//             />
//             {error && <div className={styles.error_msg}>{error}</div>}
//             <button type="submit" className={styles.green_btn}>Create Account</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";
// import { toast } from "react-toastify";


// const Signup = () => {
// 	const [data, setData] = useState({
// 		username: "",
// 		email: "",
// 		password: "",
// 	});
// 	const [error, setError] = useState("");
// 	const navigate = useNavigate();

// 	const handleChange = ({ currentTarget: input }) => {
// 		setData({ ...data, [input.name]: input.value });
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const url = "http://localhost:1337/api/auth/local/register";
// 			const config = {
// 				headers: { "Content-Type": "application/json" },
// 			};

// 			const { data: res } = await axios.post(url, data, config);
// 			if (!!res) {
// 				toast.success("Registered successfully!", {
// 					hideProgressBar: true,
// 				});
// 			}
// 			navigate("/login");
// 			console.log(res.message);
// 		} catch (error) {
// 			console.error(error);
// 			if (error.response && error.response.status >= 400) {
// 				setError(error.response.data.message || "Registration failed. Please check your inputs.");
// 			} else {
// 				setError("An error occurred. Please try again later.");
// 			}
// 		}
// 	};

// 	return (
// 		<div className={styles.signup_container}>
// 			<div className={styles.signup_form_container}>
// 				<div className={styles.left}>
// 					<h1>Welcome Back</h1>
// 					<Link to="/login">
// 						<button type="button" className={styles.white_btn}>
// 							Sign in
// 						</button>
// 					</Link>
// 				</div>
// 				<div className={styles.right}>
// 					<form className={styles.form_container} onSubmit={handleSubmit}>
// 						<h1>Create Account</h1>
// 						<input
// 							type="text"
// 							placeholder="First Name"
// 							name="username"
// 							onChange={handleChange}
// 							value={data.username}
// 							required
// 							className={styles.input}
// 						/>
// 						<input
// 							type="email"
// 							placeholder="Email"
// 							name="email"
// 							onChange={handleChange}
// 							value={data.email}
// 							required
// 							className={styles.input}
// 						/>
// 						<input
// 							type="password"
// 							placeholder="Password"
// 							name="password"
// 							onChange={handleChange}
// 							value={data.password}
// 							required
// 							className={styles.input}
// 						/>
// 						{error && <div className={styles.error_msg}>{error}</div>}
// 						<button type="submit" className={styles.green_btn}>Create Account</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Signup;

//___________________________________________________________________________________________________________

// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

// const Signup = () => {
// 	const [data, setData] = useState({
// 		username: "",
// 		email: "",
// 		password: "",
// 	}); // Use correct field names (replace with required fields)
// 	const [error, setError] = useState("");
// 	const navigate = useNavigate();

// 	// ... (rest of the code remains the same, except:)
// 	const handleChange = ({ currentTarget: input }) => {
// 		setData({ ...data, [input.name]: input.value });
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const url = "http://localhost:1337/api/auth/local/register";

// 			// Set content type header for JSON data
// 			const config = {
// 				headers: { "Content-Type": "application/json" },
// 			};

// 			const { data: res } = await axios.post(url, data, config);
// 			navigate("/login");
// 			console.log(res.message);
// 		} catch (error) {
// 			// Handle errors more informatively
// 			console.error(error);
// 			if (error.response && error.response.status >= 400) {
// 				setError(error.response.data.message || "Registration failed. Please check your inputs.");
// 			} else {
// 				setError("An error occurred. Please try again later.");
// 			}
// 		}
// 	};

// 	return (
// 		<div className={styles.signup_container}>
// 			<div className={styles.signup_form_container}>
// 				<div className={styles.left}>
// 					<h1>Welcome Back</h1>
// 					<Link to="/login">
// 						<button type="button" className={styles.white_btn}>
// 							Sign in
// 						</button>
// 					</Link>
// 				</div>
// 				<div className={styles.right}>
// 					<form className={styles.form_container} onSubmit={handleSubmit}>
// 						<h1>Create Account</h1>
// 						<input
// 							type="text"
// 							placeholder="First Name"
// 							name="firstName"
// 							onChange={handleChange}
// 							value={data.firstName}
// 							required
// 							className={styles.input}
// 						/>
// 						<input
// 							type="email"
// 							placeholder="Email"
// 							name="email"
// 							onChange={handleChange}
// 							value={data.email}
// 							required
// 							className={styles.input}
// 						/>
// 						<input
// 							type="password"
// 							placeholder="Password"
// 							name="password"
// 							onChange={handleChange}
// 							value={data.password}
// 							required
// 							className={styles.input}
// 						/>
// 						{error && <div className={styles.error_msg}>{error}</div>}
// 						<button type="submit" className={styles.green_btn}>
// 							Sign Up
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Signup;






// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

// const Signup = () => {
// 	const [data, setData] = useState({
// 		firstName: "",
// 		lastName: "",
// 		email: "",
// 		password: "",
// 	});
// 	const [error, setError] = useState("");
// 	const navigate = useNavigate();

// 	const handleChange = ({ currentTarget: input }) => {
// 		setData({ ...data, [input.name]: input.value });
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		try {
// 			const url = "http://localhost:1337/api/auth/local/register";
// 			const { data: res } = await axios.post(url, data);
// 			navigate("/login");
// 			console.log(res.message);
// 		} catch (error) {
// 			if (
// 				error.response &&
// 				error.response.status >= 400 &&
// 				error.response.status <= 500
// 			) {
// 				setError(error.response.data.message);
// 			}
// 		}
// 	};

// 	return (
// 		<div className={styles.signup_container}>
// 			<div className={styles.signup_form_container}>
// 				<div className={styles.left}>
// 					<h1>Welcome Back</h1>
// 					<Link to="/login">
// 						<button type="button" className={styles.white_btn}>
// 							Sign in
// 						</button>
// 					</Link>
// 				</div>
// 				<div className={styles.right}>
// 					<form className={styles.form_container} onSubmit={handleSubmit}>
// 						<h1>Create Account</h1>
// 						<input
// 							type="text"
// 							placeholder="First Name"
// 							name="firstName"
// 							onChange={handleChange}
// 							value={data.firstName}
// 							required
// 							className={styles.input}
// 						/>
// 						<input
// 							type="text"
// 							placeholder="Last Name"
// 							name="lastName"
// 							onChange={handleChange}
// 							value={data.lastName}
// 							required
// 							className={styles.input}
// 						/>
// 						<input
// 							type="email"
// 							placeholder="Email"
// 							name="email"
// 							onChange={handleChange}
// 							value={data.email}
// 							required
// 							className={styles.input}
// 						/>
// 						<input
// 							type="password"
// 							placeholder="Password"
// 							name="password"
// 							onChange={handleChange}
// 							value={data.password}
// 							required
// 							className={styles.input}
// 						/>
// 						{error && <div className={styles.error_msg}>{error}</div>}
// 						<button type="submit" className={styles.green_btn}>
// 							Sign Up
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Signup;
