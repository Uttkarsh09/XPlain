/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS, initialData } from "./editorTools";
import { changeTitle } from "../../scripts/general";
import uploadBlog from "./upload";
import { useSelector } from "react-redux";
import { userInfo } from "../Store/Slices/UserSlice";
import ReactTag from "./KeywordTags";

function validateFields(title, readingTime, userId) {}

const Editor = ({ history }) => {
	const [editor, setEditor] = useState();
	const holder = "editorjs";
	const titleRef = useRef();
	const readingTimeRef = useRef();
	const user = useSelector(userInfo);
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

			if (title === "") {
				alert("Enter a title");
				return;
			}
			if (readingTime === "") {
				alert("Enter a reading time");
				return;
			}

			if (user.userId === undefined) {
				alert("LOGIN FIRST");
				history.push("/login");
				return;
			}

			uploadBlog({
				authorId: user.userId,
				authorName: user.username,
				content: output,
				keywords: keywordTags,
				readingTime: parseInt(readingTime),
				title: title,
			}).then((res) => {
				alert("Blog uploaded");
				history.push("/blogs");
			});
		});
	}

	useLayoutEffect(() => changeTitle("XPlain • Editor"), []);

	useEffect(() => {
		const editorSettings = new EditorJS({
			holder: holder,
			autofocus: false,
			tools: EDITOR_JS_TOOLS,
			data: initialData,
			logLevel: "INFO",
		});
		setEditor(editorSettings);
	}, []);

	useEffect(() => {
		if (editor) titleRef.current.focus();
	}, [editor]);

	return (
		<form className="editor-container" onSubmit={onPublish}>
			<div>
				<input type="text" placeholder="Blog Title" ref={titleRef} />
				<input type="number" placeholder="Reading Time" ref={readingTimeRef} />
			</div>
			<ReactTag {...{ setKeywordTags }} />
			<div id={holder} className="editor"></div>
			<div>
				<input className="btn-submit" type="submit" value="PUBLISH" />
			</div>
		</form>
	);
};

export default Editor;
