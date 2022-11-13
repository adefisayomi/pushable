// ----------------------------------------------------------------------

const nextConfig = {
  trailingSlash: true,
  env: {
    DEV_API: 'http://localhost:4000/api/v1',
    PRODUCTION_API: 'https://zone-assets-api.vercel.app',
    GOOGLE_API: '',
    API_KEY: "AIzaSyBv9wU_XIl-3SWAWCCf0ZxHgxl606lr6Y8",
    APP_ID: "1:755177135538:web:08c839ba2cb6786c3b18ab"
  },
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
