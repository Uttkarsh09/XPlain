import React, { useLayoutEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { update, userInfo } from "./Store/Slices/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { changeTitle } from "../scripts/general";

function Signup({ history }) {
	const user = useSelector(userInfo); // This is to be used to display and subscribe to the store data
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		changeTitle("XPlain • Signup");
	}, []);

	function onSubmit(e) {
		e.preventDefault();
		const username = e.target[0].value.trim();
		const password = e.target[1].value.trim();

		if (username === "") {
			alert("Enter Username");
			return;
		}

		if (password === "") {
			alert("Enter password");
			return;
		}

		axios
			.post("http://localhost:9000/user/addNewUser", {
				username,
				password,
			})
			.then((res) => {
				console.log(res.data);
				alert("User Added!");
				dispatch(update({ userId: res.data._id, username: res.data.username }));
				console.log(user);
				history.push("/blogs");
			})
			.catch((err) => {
				alert(err.data.errorCode);
			});
	}

	return (
		<div className="container signup-container">
			<form onSubmit={onSubmit}>
				<input type="text" name="userName" placeholder="userName" required />
				<input
					type="password"
					name="password"
					placeholder="password"
					required
				/>
				<input type="submit" value="SIGN UP" />
				<p>
					Already have an account.{" "}
					<Link to="/login" style={{ color: "blue" }}>
						Hop In
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Signup;
