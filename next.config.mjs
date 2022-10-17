// ----------------------------------------------------------------------

const nextConfig = {
  trailingSlash: true,
  env: {
    DEV_API: 'http://localhost:3000',
    PRODUCTION_API: 'https://zone-assets-api.vercel.app',
    GOOGLE_API: '',
    firebaseConfig: {
      apiKey: "AIzaSyD0gtwgULOinJ2eYVvBmf5k4wjE3hHLWEA",
      authDomain: "pushable-scheduler.firebaseapp.com",
      projectId: "pushable-scheduler",
      storageBucket: "pushable-scheduler.appspot.com",
      messagingSenderId: "761983881092",
      appId: "1:761983881092:web:0f01718c8cb72bae77d7d1",
      measurementId: "G-73K3RSCCD9"
    }
  },
  images: {
    domains: ['flagcdn.com'],
  },
};

export default nextConfig;
