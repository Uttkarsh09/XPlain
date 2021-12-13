import React, { useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { addUserInfo } from "./Store/Slices/UserSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validateSignupFields } from "./Utilities/validation";
import Input from "./Utilities/Input";
import useChangeTitle from "./Hooks/useChangeTitle";
import useEnvironmentVariables from "./Hooks/useEvnironmentVariables";
import "../styles/CSS/loginSignup.css";
// import useUserInfo from "./Hooks/useUserInfo";

function Signup({ history }) {
	// const user = useUserInfo(); // This is to be used to display and subscribe to the store data
	const dispatch = useDispatch();
	const usernameRef = useRef();
	const passwordRef = useRef();
	const nameRef = useRef();
	const env_var = useEnvironmentVariables();

	useChangeTitle("Signup");

	useEffect(() => {
		nameRef.current.focus();
	}, []);

	async function onSubmit(e) {
		e.preventDefault();

		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		const name = nameRef.current.value;

		const result = validateSignupFields(name, username, password);
		if (!result.valid) {		
			toast.error(result.message.toUpperCase());
			if (result.focusOn === "name") {
				nameRef.current.focus();
			} else if (result.focusOn === "username") {
				usernameRef.current.focus();
			} else {
				passwordRef.current.focus();
			}
			return;
		}

		axios
			.post(
				`${env_var.REACT_APP_BACKEND_URL}/user/addNewUser`,
				{
					name,
					username,
					password,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				// console.log(res.data);
				toast.success("Account created!");
				dispatch(
					addUserInfo({
						userId: res.data._id,
						username: res.data.username,
						profilePhoto: res.data.defaultProfilePhoto,
					})
				);
				// console.log(user);
				history.push(`/user-profile/${username}`);
			})
			.catch((err) => {
				if (err.response.data.errorMsg === "USERNAME_ALREADY_PRESENT") {
					toast.error("USERNAME ALREADY TAKEN");
					usernameRef.current.focus();
					return;
				}
				toast.error("ERROR WHILE SIGNING UP");
				console.log(err.response);
			});
	}

	return (
		<div className="container signup-container">
			<form onSubmit={onSubmit}>
				<div className="logo">XPlain</div>
				<Input
					type="text"
					name="name"
					ref={nameRef}
					className="custom-input"
					required={true}
				>
					Name
				</Input>
				<Input
					type="text"
					name="userName"
					ref={usernameRef}
					className="custom-input"
					required={true}
				>
					Username
				</Input>
				<Input
					type="password"
					className="custom-input"
					ref={passwordRef}
					name="password"
					required={true}
				>
					Password
				</Input>

				<input type="submit" value="SIGN UP" />
				<p>
					Already have an account.{" "}
					<Link to="/login" style={{ color: "blue" }}>
						Hop In 🦘
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Signup;
