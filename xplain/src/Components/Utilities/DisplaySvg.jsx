import React from "react";

function DisplaySvg({ className, svgString, onClick }) {
	const buff = new Buffer(svgString);
	const base64data = buff.toString("base64");

	return (
		<img
			src={`data:image/svg+xml;base64,${base64data}`}
			alt="user profile"
			className={className}
			onClick={onClick}
		/>
	);
}

export default DisplaySvg;
