import { createAvatar } from "@dicebear/avatars";
import { optimize } from "svgo";
import * as style from "@dicebear/micah";

async function generateAvatar(username) {
	const svg = createAvatar(style, {
		seed: username,
	});

	const result = optimize(svg.toString(), {
		multipass: true,
	}).data;
	const optimizedSvgString = await result.data;

	return optimizedSvgString;
}

export { generateAvatar };
