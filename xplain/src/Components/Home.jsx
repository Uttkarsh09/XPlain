import React from "react";
import useChangeTitle from "./Utilities/useChangeTitle";
// import "../styles/Home/home.css";

function Home() {
	useChangeTitle("Home");

	return (
		<div className="home container">
			<p className="home-text">
				XPlain stuff <br /> in a{" "}
				<span className="gradient-text">simple manner</span> to everyone
			</p>
		</div>
	);
}

export default Home;
