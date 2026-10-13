const { execFileSync } = require("child_process");
const fs = require("fs");

module.exports = function (eleventyConfig) {
	// Last modification date of a source file (dd-mm-yyyy), taken from git history.
	// Falls back to the file's mtime for files that are not committed yet.
	eleventyConfig.addFilter("lastModified", (inputPath) => {
		let date;
		try {
			const iso = execFileSync("git", ["log", "-1", "--format=%aI", "--", inputPath], { encoding: "utf8" }).trim();
			if (iso) date = new Date(iso);
		} catch (e) {}
		if (!date) date = fs.statSync(inputPath).mtime;
		const pad = (n) => String(n).padStart(2, "0");
		return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;
	});

	// Copy the compiled CSS file
	eleventyConfig.addPassthroughCopy("./src/style.css");
	// Copy images from pictures directory
	eleventyConfig.addPassthroughCopy("./src/pictures");
	// Copy the favicon shown in the browser tab
	eleventyConfig.addPassthroughCopy("./src/favicon.svg");
	// Watch for CSS changes (for Tailwind output)
	eleventyConfig.addWatchTarget("./src/**/*.css");
	eleventyConfig.setWatchThrottleWaitTime(100);

	return {
		dir: {
			input: "src",
			output: "_site",
		},
		pathPrefix: "/",
	};
};
