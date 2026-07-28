/** @type {import('next').NextConfig} */
const nextConfig = {
  // This site is reached at pmg.cards/focus — PMG_Website's own Next.js
  // config proxies /focus/:path* here via rewrites(). basePath makes every
  // internal Link, asset, and route resolve under /focus automatically, so
  // this deployment's own root ("/") isn't meant to be hit directly.
  basePath: "/focus",
};

export default nextConfig;
