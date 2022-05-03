import { toast } from "react-toastify";

function addReadingTimeListener() {
	const readingTimeInput = document.querySelector(".reading-time-input");

	readingTimeInput.addEventListener("keyup", (event) => {
		const minutes = parseInt(readingTimeInput.value);
		if (minutes > 30) {
			readingTimeInput.value = "30";
			toast.warning("Your blog should not take more than 30 mins to read");
		}
	});
}

function validateEditorFields(title, readingTime) {
	if (title === "") {
		// alert("Enter a title");
		return { valid: false, message: "Enter a title" };
	}
	if (title.length > 90) {
		return {
			valid: false,
			message: "Title name should be within 90 characters",
		};
	}
	if (readingTime === "") {
		return { valid: false, message: "Enter reading time" };
	}
	return { valid: true };
}

function validateLoginFields(username) {
	username = username.trim();

	if (username === "") {
		return {
			valid: false,
			message: `Can't leave username empty`,
		};
	}
	return { valid: true };
}

function validateSignupFields(name, username, password = false) {
	[name, username, password] = [name, username, password].map((field) => {
		if(field) return field.trim();
		return field;
	});

	if (name.length < 8) {
		return {
			valid: false,
			message: "Name should be of at least 8 characters",
			focusOn: "name",
		};
	}

	if (/[^a-z^A-Z\s]+/gim.test(name)) {
		return {
			valid: false,
			message: "Name should not contain digits or special characters",
			focusOn: "name",
		};
	}

	if (username.length < 5) {
		return {
			valid: false,
			message: "Username should be of at least 5 characters",
			focusOn: "username",
		};
	}

	// eslint-disable-next-line no-useless-escape
	if (/[\s]+/gim.test(username)) {
		return {
			valid: false,
			message: "Username should not contain spaces",
			focusOn: "username",
		};
	}

	// if (password && /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gim.test(password)) {
	// 	return {
	// 		valid: false,
	// 		message:
	// 			"Password should have minimum 8 characters, at least 1 letter and one number",
	// 		focusOn: "password",
	// 	};
	// }

	return { valid: true };
}

function formatDate(date) {
	const currDate = new Date();
	const areSameDate =
		currDate.getFullYear() === date.getFullYear() &&
		currDate.getMonth() === date.getMonth() &&
		currDate.getDay() === date.getDay();

	if (areSameDate) {
		return "Today";
	}
	const month = date.toLocaleString("default", { month: "short" });
	date = date.getDate();
	return `${date} ${month}`;
}

export {
	validateEditorFields,
	addReadingTimeListener,
	validateLoginFields,
	validateSignupFields,
	formatDate,
};
