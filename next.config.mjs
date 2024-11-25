/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.google.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.cdninstagram.com',
            },
            {
                protocol: 'https',
                hostname: 'graph.instagram.com',
            },
            {
                protocol: 'https',
                hostname: 'scontent.cdninstagram.com',
            },
            {
                protocol: 'https',
                hostname: 'scontent-lax3-1.cdninstagram.com',
            },
            {
                protocol: 'https',
                hostname: 'scontent-lax3-2.cdninstagram.com',
            },
            {
                protocol: 'https',
                hostname: 'www.google.com',
                port: '',
                pathname: '/s2/**',
            },
        ]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        })
        return config
    }
};

export default nextConfig;