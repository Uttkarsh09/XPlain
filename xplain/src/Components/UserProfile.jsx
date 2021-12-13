/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { removeUserInfo } from "./Store/Slices/UserSlice";
import { useDispatch } from "react-redux";
import DisplaySvg from "./Utilities/DisplaySvg";
import { AlertCircle } from "react-feather";
import EditData from "./EditData";
import useUserInfo from "./Hooks/useUserInfo";
import { toast } from "react-toastify";
import useEnvironmentVariables from "./Hooks/useEvnironmentVariables";
import "../styles/CSS/userProfile.css";

function UserProfile({ match }) {
	const username = match.params.username;
	const [user, setUser] = useState(false);
	const [editUserData, setEditUserData] = useState(false);
	const env_var = useEnvironmentVariables();

	useEffect(() => {
		axios
			.get(`${env_var.REACT_APP_BACKEND_URL}/user/userInfo/${username}`)
			.then((res) => {
				res = res.data;
				setUser(res);
			})
			.catch((err) => {
				// console.log(err.response.data);
				if (err.response.data.errorMsg === "USER_DOES_NOT_EXIST") {
					// console.log(err.response.data);
					setUser("USER_DOES_NOT_EXIST");
				} else {
					console.log("There was an unknown error while retreving userInfo");
					console.log(err);
				}
			});
	}, [env_var.REACT_APP_BACKEND_URL, username]);

	return (
		<>
			{editUserData && <EditData {...user} setEditUserData={setEditUserData} />}
			{!editUserData && user ? (
				user === "USER_DOES_NOT_EXIST" ? (
					<UserNotFound />
				) : (
					<Profile {...user} setEditUserData={setEditUserData} />
				)
			) : (
				<Loading />
			)}
		</>
	);
}

function Profile({
	name,
	username,
	followers,
	following,
	defaultProfilePhoto,
	setEditUserData,
}) {
	name = name.charAt(0).toUpperCase() + name.substr(1);
	const history = useHistory();
	const user = useUserInfo();
	const dispatch = useDispatch();
	let profilePhoto = "";
	const userCanEdit = user.username === username; // user.username is the logged-in username and other is the searched one
	const env_var = useEnvironmentVariables();
	if (userCanEdit) {
		profilePhoto = user.profilePhoto;
	} else {
		profilePhoto = defaultProfilePhoto;
	}

	function logout() {
		axios
			.post(
				`${env_var.REACT_APP_BACKEND_URL}/logout`,
				{},
				{ withCredentials: true }
			)
			.then((_) => {
				console.log("Removing user info from redux state");
				dispatch(removeUserInfo());
				history.push("/");
			})
			.catch((err) => {
				console.log("Error while logging out");
				console.log(err.response);
			});
	}

	return (
		<div className="user-profile container">
			<div>
				{profilePhoto ? (
					<DisplaySvg className="profile-photo" svgString={profilePhoto} />
				) : (
					<img
						src={window.location.origin + "/profile.svg"}
						className="profile-photo"
						alt=""
					/>
				)}
			</div>

			<ul className="user-info-list">
				<li className="user-info name">
					<span className="tag">NAME :</span>
					<span className="data">{name}</span>
				</li>

				<li className="user-info username">
					<span className="tag">UNAME :</span>
					<span className="data">{username}</span>
				</li>

				{/* <li className="follow-info user-info">
					<div className="follow-head">
						<div className="follow-text">FOLLOWERS</div>
						<div className="follow-data">{followers}</div>
					</div>

					<div className="follow-head">
						<div className="follow-text">FOLLOWING</div>
						<div className="follow-data">{following}</div>
					</div>
				</li> */}
				<li
					className="user-info liked-blogs"
					onClick={() => toast.warn("This feature is currently unavailable")}
				>
					<span>VIEW {userCanEdit ? "YOUR" : "THEIR"} BLOGS</span>
				</li>
			</ul>

			{userCanEdit ? (
				<div className="action-btns">
					<button
						className="btn-edit"
						id="btn-edit"
						onClick={() => setEditUserData(true)}
						// onClick={() => history.push(`/edit-user/${username}`)}
					>
						EDIT ✏️
					</button>
					<button className="btn-logout" onClick={logout}>
						LOGOUT 👋
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}

function UserNotFound() {
	return (
		<div className="user-not-found container">
			<AlertCircle color="red" size={150} />
			<div>User Not Found</div>
		</div>
	);
}

export default UserProfile;
