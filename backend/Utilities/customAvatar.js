const { createAvatar } = require("@dicebear/avatars");
const { optimize } = require("svgo");
const style = require("@dicebear/micah");

async function generateAvatar(username) {
	const svg = createAvatar(style, {
		seed: username,
	});

	const result = optimize(svg.toString(), {
		multipass: true,
	});

	const optimizedSvgString = result.data;
	return optimizedSvgString;
}

module.exports = { generateAvatar };
