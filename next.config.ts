module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**", // Allow all paths under the domain
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        pathname: "/**", // Allow all paths under the domain
      },
    ],
  },
};
