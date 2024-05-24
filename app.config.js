import 'dotenv/config';

export default {
 name: 'PrimeraApp-ReactNative',
 slug: 'PrimeraApp-ReactNative',
 version: '1.0.0',
 orientation: 'portrait',
 icon: './assets/icon.png',
 splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
 },
 updates: {
    fallbackToCacheTimeout: 0,
 },
 assetBundlePatterns: [
    '**/*',
 ],
 ios: {
    supportsTablet: true,
 },
 android: {
   package: "com.tudominio.repositoriesApp", 
 },
 web: {
    favicon: './assets/favicon.png',
 },
 extra: {
  eas: {
   projectId: '33efa4f1-0b72-4c38-807f-5f77ab0c5ca4', 
  },
  env: process.env.ENV,
  apolloUri: process.env.APOLLO_URI,
 }
};