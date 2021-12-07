import React from "react";
import ReactLoading from "react-loading";

function Loading() {
	return (
		<div className="loading">
			<ReactLoading type="spin" color="lightblue" />
		</div>
	);
}

export default Loading;
