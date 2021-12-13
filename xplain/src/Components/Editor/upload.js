/* eslint-disable no-unused-vars */
import axios from "axios";

async function uploadBlog(blog) {
	// console.log("uploading");
	const res = await axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/blog/post`,
		blog
	);
	const resObj = {
		...res.data,
		status: res.status,
	};
	// console.log(resObj);
	return resObj;
}

export default uploadBlog;
