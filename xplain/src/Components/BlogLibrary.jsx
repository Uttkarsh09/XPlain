import React, { useState, useEffect, useRef, useCallback } from "react";
import Loading from "./Loading";
import axios from "axios";
import { Eye, Clock } from "react-feather";
import useChangeTitle from "./Hooks/useChangeTitle";
import { Link } from "react-router-dom";
import useEnvironmentVariables from "./Hooks/useEvnironmentVariables";
import "../styles/CSS/blogLibrary.css";
import {AlertCircle} from "react-feather";

function getBlogBasicInfo(url, skip, limit) {
	return axios.get(`${url}/blog/blog-basic-info/`, {
		params: { skip: skip.current, limit },
	});
}

function BlogLibrary() {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const skip = useRef(0);
	const limit = 5;
	const env_var = useEnvironmentVariables();

	// useCallback is used to cache the function.
	const loadMoreBlogs = useCallback(() => {
		getBlogBasicInfo(env_var.REACT_APP_BACKEND_URL, skip, limit)
			.then((res) => {
				skip.current = skip.current + limit;
				const newBlogs = res.data.blogs;
				setBlogs((oldBlogs) => [...oldBlogs, ...newBlogs]);
				setLoading(false);
			})
			.catch((err) => {
				if (err.response.data.errorMsg === "NO_BLOGS_EXISTS") {
					setLoading(false);
				}
			});
	}, [env_var.REACT_APP_BACKEND_URL]);

	useChangeTitle("Blogs");

	useEffect(() => {
		loadMoreBlogs();
	}, [loadMoreBlogs]);

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<BlogLibraryContent loadMoreBlogs={loadMoreBlogs} blogs={blogs} />
			)}
		</div>
	);
}

function BlogLibraryContent({ blogs, loadMoreBlogs }) {
	return (
		<div className="blog-liberary container">
			<h1>Recent Blogs</h1>
			{blogs.length === 0 && <div className="no-blogs">
				<div>
					NO BLOGS FOUND
				</div>
				<div>
					<AlertCircle size="50" color="red" style={{marginTop: "20px"}} />
				</div>
			</div>}
			{blogs.length !== 0 && (
				<>
					<div className="blogroll">
						{blogs.map((blog) => {
							return <BlogView key={blog._id} {...blog} />;
						})}
					</div>
					<button onClick={loadMoreBlogs}>Load More</button>
				</>
			)}
		</div>
	);
}

function BlogView({ title, keywords, readingTime, authorName, views, _id }) {
	return (
		<Link className="blog-block" to={`/blogs/${_id}`}>
			<h2 className="blog-title">{title}</h2>
			<h3 className="blog-author">~ {authorName}</h3>
			<div className="blog-stats">
				<span>
					<Clock
						className="icon"
						size={13}
						// strokeWidth={2}
						stroke="rgb(150, 150, 150)"
					/>{" "}
					{readingTime}
				</span>
				<span>
					<Eye
						className="icon"
						size={13}
						// strokeWidth={2}
						stroke="rgb(150, 150, 150)"
					/>{" "}
					{views}
				</span>
			</div>
		</Link>
	);
}

export default BlogLibrary;
