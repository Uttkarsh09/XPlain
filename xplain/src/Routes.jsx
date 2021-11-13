import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import Editor from "./Components/Editor/Editor";
import NotFound404 from "./Components/NotFound404";
import BlogLibrary from "./Components/BlogLibrary";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import axios from "axios";
import Loading from "./Components/Loading";
import UserProfile from "./Components/UserProfile";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "./Components/Store/Slices/UserSlice";

function Routes() {
	const dispatch = useDispatch();
	const [userFound, setUserFound] = useState(false);

	useEffect(() => {
		axios
			.post(
				"http://localhost:9000/autoLogin",
				{
					/* No Data */
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log("Logged in with existing session");
				dispatch(
					update({ userId: res.data.userId, username: res.data.username })
				);
			})
			.catch((err) => {
				console.log(err)
				if (err.response.data.errorMsg === "SESSION_NOT_FOUND") {
					console.log("Session not found");
				} else {
					console.log("THROWING RNDM ERROR");
					throw err;
				}
			})
			.finally(() => {
				setUserFound(true);
			});
	}, [dispatch, setUserFound]);

	return (
		<div>
			{userFound ? (
				<Switch>
					<Route exact path={["/home", "/"]} component={Home} />
					<Route exact path="/edit" component={Editor} />
					<Route exact path="/blogs" component={BlogLibrary} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/userProfile/:username" component={UserProfile} />
					<Route path="/" component={NotFound404} />
				</Switch>
			) : (
				<Loading />
			)}
		</div>
	);
}

export default Routes;
