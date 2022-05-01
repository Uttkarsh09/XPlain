import CheckList from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";


const initialData = {
	time: 1638893109039,
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
					"Keep it simple.",
					"Cover all the points to be xplained by the topic.",
					"Use white spaces.",
					"Read before publishing.",
					"No spamming...",
				],
			},
		},
	],
	version: "2.22.2",
};

export { initialData };

export const EDITOR_JS_TOOLS = {
	// image: Image,
	list: {
		class: List,
		inlineToolbar: true,
	},
	linkTool: {
		class: LinkTool,
		inlineToolbar: true,
		config: {
			endpoint: `${process.env.REACT_APP_BACKEND_URL}/editorJS/link`,
		}
	},
	underline: {
		class: Underline,
		inlineToolbar: true,
	},
	checklist: {
		class: CheckList,
		inlineToolbar: true,
	},
	inlineCode: {
		class: InlineCode,
		inlineToolbar: true,
	},
	simpleImage: {
		class: SimpleImage,
		inlineToolbar: true,
	},
	table: {
		class: Table,
		inlineToolbar: true,
	},
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
	},
	marker: Marker,
	header: {
		class: Header,
		inlineToolbar: true,
	},
	embed: {
		class: Embed,
		inlineToolbar: true,
		config: {
			services: {
				youtube: true,
				codepen: true,
				imgur: true,
				twitch: true,
				vimeo: true,
				vine: true,
				twitter: true,
				instagram: true,
				facebook: true,
				pinterest: true,
			},
		},
	},
};
