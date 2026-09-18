import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
	options: {
		remarkPlugins: ["remark-gfm", "remark-math"],
		rehypePlugins: [
			"rehype-slug",
			["rehype-katex", { strict: false }],
			["rehype-pretty-code", { theme: "github-dark", keepBackground: false }],
		],
	},
});

const nextConfig: NextConfig = {
	output: "export",
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	trailingSlash: true,
};

export default withMDX(nextConfig);
