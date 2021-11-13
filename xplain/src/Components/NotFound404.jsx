import React from "react";
import { Link } from "react-router-dom";

const NotFound404 = () => {
	return (
		<>
			<div>NOT FOUND</div>
			<Link to="/home">Go to home</Link>
		</>
	);
};

export default NotFound404;
