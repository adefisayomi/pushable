// ----------------------------------------------------------------------

const nextConfig = {
  trailingSlash: true,
  env: {
    DEV_API: 'http://localhost:4000/api/v1',
    PRODUCTION_API: 'https://zone-assets-api.vercel.app',
    GOOGLE_API: '',
    firebaseConfig: {
      apiKey: "AIzaSyBv9wU_XIl-3SWAWCCf0ZxHgxl606lr6Y8",
      authDomain: "pushable-posts.firebaseapp.com",
      projectId: "pushable-posts",
      storageBucket: "pushable-posts.appspot.com",
      messagingSenderId: "755177135538",
      appId: "1:755177135538:web:08c839ba2cb6786c3b18ab",
      measurementId: "G-VLFX0H1651"
    }
  },
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
