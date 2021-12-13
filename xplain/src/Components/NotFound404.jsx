import React from "react";
import { Link } from "react-router-dom";
import "../styles/CSS/notFound404.css";

const NotFound404 = () => {
	return (
		<div className="not-found-container">
			<div className="title">404 NOT FOUND</div>
			<Link className="link" to="/">
				Go to home
			</Link>
		</div>
	);
};

export default NotFound404;
