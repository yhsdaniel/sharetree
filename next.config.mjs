/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                port: '',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**'
            }
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    turbopack: {
        // Example: adding an alias and custom file extension
        resolveAlias: {
        underscore: 'lodash',
        },
        resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    output: "standalone",
};

export default nextConfig;
