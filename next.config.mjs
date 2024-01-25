/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '/**',
              },
              {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                port: '',
              },
        ]
    }
};

export default nextConfig;
