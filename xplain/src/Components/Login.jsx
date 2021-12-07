import axios from "axios";
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserInfo } from "./Store/Slices/UserSlice";
import Input from "./Utilities/Input";
import useChangeTitle from "./Utilities/useChangeTitle";
import { validateLoginFields } from "./Utilities/validation";
import { toast } from "react-toastify";

function Login({ history }) {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const dispatch = useDispatch();

	useChangeTitle("Signup");
	useEffect(() => {
		usernameRef.current.focus();
	}, []);

	function onSubmit(e) {
		e.preventDefault();
		const username = usernameRef.current.value.trim();
		const password = passwordRef.current.value.trim();

		const result = validateLoginFields(username);
		if (!result.valid) {
			toast.error(result.message.toUpperCase());
			usernameRef.current.focus();
			return;
		}

		axios
			.post(
				"http://localhost:9000/user/login",
				{
					username,
					password,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data.msg);
				dispatch(
					addUserInfo({
						userId: res.data.userId,
						username: res.data.username,
						profilePhoto: res.data.defaultProfilePhoto,
					})
				);
				toast.success("Logged in successfully!");
				history.push("/home");
			})
			.catch((err) => {
				if (err.response.data.errorMsg === "INCORRECT_CREDENTIALS") {
					toast.warn(err.response.data.errorMsg);
				} else {
					console.log("Error in login");
					console.log(err.response.data.errorMsg);
				}
			});
	}

	return (
		<div className="container login-container">
			<form onSubmit={onSubmit} className="login-form">
				<div className="logo">XPlain</div>
				<Input
					type="text"
					ref={usernameRef}
					className="custom-input"
					name="username"
					required={true}
				>
					Username
				</Input>
				<Input
					type="password"
					ref={passwordRef}
					name="password"
					required={true}
					className="custom-input"
				>
					Password
				</Input>
				<input type="submit" value="LOGIN" />
				<p>
					Don't have an account.{" "}
					<Link to="/signup" style={{ color: "blue" }}>
						Sign Up 📝
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;
