import CheckList from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";

const initialData = {
	time: 1632755414969,
	blocks: [
		{
			id: "NbiQX12A3K",
			type: "header",
			data: {
				text: "Editor.js",
				level: 2,
			},
		},
		{
			id: "7Ci0ofrCUq",
			type: "paragraph",
			data: {
				text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
			},
		},
		{
			id: "gkMgInaNfE",
			type: "header",
			data: {
				text: "Key features",
				level: 1,
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
	link: {
		class: Link,
		inlineToolbar: true,
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
