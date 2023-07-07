/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    const ret = [
      {
        source: "/v1/complete",
        destination: "https://api.anthropioc.com/v1/complete",
      },
      {
        source: "/v1/complete/:path*",
        destination: "https://api.openai.com/:path*",
      },
      {
        source: "/google-fonts/:path*",
        destination: "https://fonts.googleapis.com/:path*",
      },
      {
        source: "/sharegpt",
        destination: "https://sharegpt.com/api/conversations",
      },
    ];

    const apiUrl = process.env.API_URL;
    if (apiUrl) {
      console.log("[Next] using api url ", apiUrl);
      ret.push({
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      });
    }

    return {
      beforeFiles: ret,
    };
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    }, 
    {
      test: /\.md$/,
      use: 'raw-loader',
    },
    {
      test: /LICENSE$/,
      use: 'raw-loader',
    });

    return config;
  },
  output: "standalone",
};

export default nextConfig;
