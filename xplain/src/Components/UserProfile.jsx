/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";

function UserProfile({ match }) {
	const username = match.params.username;
	const name = "UTTKARSH";
	const [userExists, setUserExists] = useState(true);

	useEffect(() => {
		axios
			.post("http://localhost:9000/user/userInfo/", {
				username,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, [username]);

	return <>{userExists ? <Profile {...{ name, username }} /> : <Loading />}</>;
}

function Profile({ name, username, followers, following }) {
	followers = 69;
	following = 69;
	username = "upatel";

	return (
		<div className="user-profile container">
			<div className="profile-photo">
				<img src="./profile.svg" alt="user profile" />
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

				<li className="follow-info user-info">
					<div className="follow-head">
						<div className="follow-text">FOLLOWERS</div>
						<div className="follow-data">{followers}</div>
					</div>

					<div className="follow-head">
						<div className="follow-text">FOLLOWING</div>
						<div className="follow-data">{following}</div>
					</div>
				</li>
				<li className="user-info liked-blogs">VIEW LIKED BLOGS</li>
			</ul>

			<div className="action-btns">
				<button className="btn-edit">EDIT</button>
				<button className="btn-logout">LOGOUT</button>
			</div>
		</div>
	);
}

export default UserProfile;
