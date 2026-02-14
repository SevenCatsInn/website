module.exports = function (eleventyConfig) {
	// Copy the compiled CSS file
	eleventyConfig.addPassthroughCopy("./src/style.css");
	// Watch for CSS changes (for Tailwind output)
	eleventyConfig.addWatchTarget("./src/**/*.css");
	eleventyConfig.setWatchThrottleWaitTime(100);

	return {
		dir: {
			input: "src",
			output: "_site",
		},
	};
};
