/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

function ReactTag({ setKeywordTags }) {
	const [tags, setTags] = useState([
		{ id: "Programming", text: "Programming" },
		{ id: "React", text: "React" },
	]);
	const [suggestions, setSuggestions] = useState([
		{ id: "USA", text: "USA" },
		{ id: "Germany", text: "Germany" },
		{ id: "Austria", text: "Austria" },
		{ id: "Costa Rica", text: "Costa Rica" },
		{ id: "Sri Lanka", text: "Sri Lanka" },
		{ id: "Thailand", text: "Thailand" },
	]);
	const keyCodes = {
		comma: 188,
		enter: [10, 13],
		tab: 9,
	};
	const delimiters = [...keyCodes.enter, keyCodes.comma, keyCodes.tab];

	function handleDelete(i) {
		const filteredTags = tags.filter((tag, index) => index !== i);
		setKeywordTags(filteredTags);
		setTags(filteredTags);
	}

	function handleAddition(tag) {
		const newTags = [...tags, tag];
		setKeywordTags(newTags);
		setTags(newTags);
	}

	function handleDrag(tag, currPos, newPos) {
		const newTags = tags.slice();
		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);
		setTags(newTags);
	}

	return (
		<div>
			<ReactTags
				tags={tags}
				placeholder="Enter keywords"
				suggestions={suggestions}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				handleDrag={handleDrag}
				delimiters={delimiters}
				allowDragDrop={false}
				clearAll={true}
				autocomplete={true}
			/>
		</div>
	);
}

export default ReactTag;
