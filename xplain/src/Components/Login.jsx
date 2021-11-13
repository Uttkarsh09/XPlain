import axios from "axios";
import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "./Store/Slices/UserSlice";
import { changeTitle } from "../scripts/general";

function Login({ history }) {
	const usernameRef = useRef();
	const passwordRef = useRef();
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		changeTitle("XPlain • Signup");
	}, []);

	function onSubmit(e) {
		e.preventDefault();
		const username = usernameRef.current.value.trim();
		const password = passwordRef.current.value.trim();

		if (username === "") {
			alert("Enter Username");
		}
		if (password === "") {
			alert("Enter Password");
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
				console.log(res.data);
				dispatch(
					update({ userId: res.data.userId, username: res.data.username })
				);
				alert("LOGGED IN SUCCESSFULLY");
				history.push("/home");
			})
			.catch((err) => {
				console.log(err.response);
				alert(err.response);
				// alert(err.response.data.errorCode);
			});
	}

	return (
		<div className="container login-container">
			<form onSubmit={onSubmit} className="login-form">
				<input
					type="text"
					ref={usernameRef}
					placeholder="Enter Username"
					required
				/>
				<input
					type="password"
					ref={passwordRef}
					placeholder="Enter Password"
					required
				/>
				<input type="submit" value="LOGIN" />
				<p>
					Don't have an account.{" "}
					<Link to="/signup" style={{ color: "blue" }}>
						Sign Up
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;
