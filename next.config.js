/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mjs', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true,
};

module.exports = withMDX(nextConfig);
