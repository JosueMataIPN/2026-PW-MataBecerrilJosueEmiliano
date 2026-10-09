const MINI_SERVIDOR_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:3306';

/** @type{import('next).NextConfig} */

module.exports = {
    reactStrictMode : true,
    async rewrites(){
        return[
            {source: '/mini/:path*', destination: `{MINI_SERVIDOR_URL}/path*`},
            {source: '/api/:path*', destination: `{BACKEND_URL}/api/:path*`}
        ];
    },
};