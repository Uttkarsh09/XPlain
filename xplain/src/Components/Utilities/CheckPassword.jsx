/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { CheckCircle } from "react-feather";

const CheckPassword = React.forwardRef((props, ref) => {
	const password = ref.current.value;
	const [temp, setTemp] = useState();
	console.log(password);

	let tempCriteria = {};

	// Check length > 8
	if (password.length > 8) {
		console.log("1");
		tempCriteria = { ...tempCriteria, length: true };
	}

	// Check uppercase
	if (/[A-Z]+/gm.test(password)) {
		console.log("2");
		tempCriteria = { ...tempCriteria, upperCaseChar: true };
	}

	// Check lowercase
	if (/[a-z]+/gm.test(password)) {
		console.log("3");
		tempCriteria = { ...tempCriteria, lowerCaseChar: true };
	}

	// Check specialChar
	if (/[^(a-z)&^(A-Z)&(^s)]+/gm.test(password)) {
		console.log("4");
		tempCriteria = { ...tempCriteria, specialChar: true };
	}

	// Check number
	if (/[0-9]+/gm.test(password)) {
		console.log("5");
		tempCriteria = { ...tempCriteria, number: true };
	}

	useEffect(() => {
		setTemp();
	}, [ref.current.value]);

	// const className = "check-password " + props.className;
	return (
		<div className={"check-password"}>
			{tempCriteria.length ? <CheckCircle /> : ""}
		</div>
	);
});

export default CheckPassword;
