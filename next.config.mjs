/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', '127.0.0.1'],
    },
    allwaysStatic: true,
    allowedDevOrigins: ['localhost', '127.0.0.1','0.0.0.0'],
};
export default nextConfig;
