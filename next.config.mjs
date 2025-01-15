/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    typescript: {
        tsconfigPath: "./tsconfig.json",
        ignoreBuildErrors: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "kaiser-leap.atlassian.net",
                pathname: "**",
            },

        ],
    },
};

export default nextConfig;
