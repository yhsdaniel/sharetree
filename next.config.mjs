/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true
    },
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
    reactStrictMode: true,
    // turbopack: {
    //     // Example: adding an alias and custom file extension
    //     resolveAlias: {
    //     underscore: 'lodash',
    //     },
    //     resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
    // },
};

export default nextConfig;
