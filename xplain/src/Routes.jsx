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
import Blog from "./Components/Blog";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserInfo } from "./Components/Store/Slices/UserSlice";
import { toast } from "react-toastify";
// import { UserProfileProvider } from "./Components/Context/UserProfileContext";

function Routes() {
	const dispatch = useDispatch();
	const [userFound, setUserFound] = useState(false);

	useEffect(() => {
		axios
			.post(
				"http://localhost:9000/login",
				{
					/* No Data */
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log("Logged in with existing session");
				dispatch(
					addUserInfo({
						userId: res.data.userId,
						username: res.data.username,
						profilePhoto: res.data.defaultProfilePhoto,
					})
				);
			})
			.catch((err) => {
				if (err.response.data.errorMsg === "SESSION_NOT_FOUND") {
					console.log("Session not found");
				} else {
					toast.error("ERROR FROM ROUTES.JSX");
					console.log("ERROR FROM ROUTES.JSX");
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
					<Route exact path="/write" component={Editor} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/user-profile/:username" component={UserProfile} />
					<Route exact path="/blog-library" component={BlogLibrary} />
					<Route exact path="/blogs/:blogId" component={Blog} />
					<Route path="/" component={NotFound404} />
				</Switch>
			) : (
				<Loading />
			)}
		</div>
	);
}

export default Routes;
