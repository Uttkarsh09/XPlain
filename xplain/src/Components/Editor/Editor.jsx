/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS, initialData } from "./editorTools";
import uploadBlog from "./upload";
import useUserInfo from "../Utilities/useUserInfo";
import ReactTag from "./KeywordTags";
import {
	validateEditorFields,
	addReadingTimeListener,
} from "../Utilities/validation";
import { toast } from "react-toastify";
import useChangeTitle from "../Utilities/useChangeTitle";

const Editor = ({ history }) => {
	const [editor, setEditor] = useState();
	const holder = "editorjs";
	const titleRef = useRef();
	const readingTimeRef = useRef();
	const user = useUserInfo();
	let keywordTags = [];

	function setKeywordTags(tags) {
		// Extracting the text from the tag object Tag object looks like https://github.com/react-tags/react-tags/blob/HEAD/demo.gif
		const tagText = [];
		tags.forEach((tag) => tagText.push(tag.text));
		keywordTags = tagText;
	}

	function onPublish(e) {
		e.preventDefault();

		editor.save().then((output) => {
			const title = titleRef.current.value.trim();
			const readingTime = readingTimeRef.current.value.trim();

			const validFields = validateEditorFields(title, readingTime);
			if (!validFields.valid) {
				toast.error(validFields.message.toUpperCase());
				return false;
			}

			uploadBlog({
				authorId: user.userId,
				authorName: user.username,
				content: output,
				keywords: keywordTags,
				readingTime: parseInt(readingTime),
				title,
			}).then(() => {
				toast.success("Blog uploaded", {
					onClose: () => {
						history.push("/blog-library");
					},
				});
			});
		});
	}

	useChangeTitle("Editor");

	useEffect(() => {
		if (user.userId === undefined) {
			toast.warn("IN ORDER TO UPLOAD A BLOG, YOU NEED TO LOG-IN", {
				onClose: () => {
					history.push("/login");
				},
			});
			return;
		}
		const editorConfig = new EditorJS({
			holder: holder,
			autofocus: false,
			tools: EDITOR_JS_TOOLS,
			data: initialData,
			logLevel: "INFO",
		});
		setEditor(editorConfig);
		addReadingTimeListener();
	}, [user.userId, history]);

	useEffect(() => {
		if (editor) titleRef.current.focus();
	}, [editor]);

	return (
		<form className="container editor-container" onSubmit={onPublish}>
			<div className="editor-inputs">
				<textarea
					type="text"
					className="blog-title-input texta"
					placeholder="Title"
					autoComplete="off"
					ref={titleRef}
				/>
				<div>
					<span>Estimated reading time </span>
					<input
						className="reading-time-input"
						placeholder="00"
						type="number"
						ref={readingTimeRef}
					/>
					<span> minutes</span>
				</div>
			</div>
			{/* <ReactTag {...{ setKeywordTags }} /> */}
			<div id={holder} className="editor"></div>
			<div>
				<input className="btn-submit" type="submit" value="PUBLISH 📝" />
			</div>
		</form>
	);
};

export default Editor;
