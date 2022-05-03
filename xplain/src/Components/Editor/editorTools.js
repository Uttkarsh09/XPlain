import CheckList from "@editorjs/checklist";
// import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Marker from "@editorjs/marker";
// import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import CodeTool from "@editorjs/code";
import Alert from "editorjs-alert";
import NestedList from "@editorjs/nested-list";			// Addon to @editorjs/list
const Paragraph = require("editorjs-paragraph-with-alignment");

const initialData = {
	time: 1651425477874,
	blocks: [
		{
			id: "Be74ezWlbK",
			type: "header",
			data: {
				text: "Points to keep in mind while writing the blog :",
				level: 2,
			},
		},
		{
			id: "HjyRMQw0CB",
			type: "list",
			data: {
				style: "ordered",
				items: [
					{
						content: "Keep it simple.",
						items: [],
					},
					{
						content: "Cover all the points to be xplained by the topic.",
						items: [],
					},
					{
						content: "Use white spaces.",
						items: [],
					},
					{
						content: "Read before publishing.",
						items: [],
					},
					{
						content: "No spamming...",
						items: [],
					},
				],
			},
		},
	],
	version: "2.23.2",
};

export { initialData };

export const EDITOR_JS_TOOLS = {
	list: {							// WORKING
		class: NestedList,
		inlineToolbar: true,
	},
	linkTool: {						// WORKING
		class: LinkTool,
		inlineToolbar: true,
		config: {
			endpoint: `${process.env.REACT_APP_BACKEND_URL}/editorJS/link`,
		},
	},
	underline: {					// WORKING
		class: Underline,
		inlineToolbar: true,
	},
	checklist: {					// WORKING
		class: CheckList,
		inlineToolbar: true,
	},
	inlineCode: {					// WORKING
		class: InlineCode,
		inlineToolbar: true,
	},
	marker: Marker, 				// WORKING
	table: {						// WORKING
		
		class: Table,
		inlineToolbar: true,
	},
	code: CodeTool, 				// WORKING
	alert: {						// WORKING
		class: Alert,
		inlineToolbar: true,
		shortcut: "CMD+SHIFT+A",
		config: {
			defaultType: "primary",
			messagePlaceholder: "Enter something",
		},
	},
	simpleImage: SimpleImage, 		// NOT WORKING
	paragraph: {					// NOT WORKING
		class: Paragraph,
		inlineToolbar: true,
	},
	header: {						// CHECK
		class: Header,
		inlineToolbar: true,
	},
	// embed: {
	// 	class: Embed,
	// 	inlineToolbar: true,
	// 	config: {
	// 		services: {
	// 			youtube: true,
	// 			codepen: true,
	// 			imgur: true,
	// 			twitch: true,
	// 			vimeo: true,
	// 			vine: true,
	// 			twitter: true,
	// 			instagram: true,
	// 			facebook: true,
	// 			pinterest: true,
	// 		},
	// 	},
	// },
};
