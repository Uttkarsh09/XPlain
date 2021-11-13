import React, { useState, useEffect, useLayoutEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import { changeTitle } from "../scripts/general";

function BlogLibrary() {
	const [allBlogs, setAllBlogs] = useState([]);

	useLayoutEffect(() => changeTitle("XPlain • Blogs"), []);

	useEffect(() => {
		axios
			.get("http://localhost:9000/blog/post/")
			.then((res) => {
				setAllBlogs(res.data.blogs);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			{!allBlogs.length ? <Loading /> : <BlogLibraryContent blogs={allBlogs} />}
		</div>
	);
}

function BlogLibraryContent({ blogs }) {
	return (
		<div>
			{blogs.map((blog) => {
				return (
					<div key={blog._id} className="blog-meta-info">
						{blog.title}
					</div>
				);
			})}
		</div>
	);
}

export default BlogLibrary;
