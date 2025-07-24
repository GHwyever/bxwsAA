   // metro.config.js
   const { getDefaultConfig } = require('expo/metro-config');

   const config = getDefaultConfig(__dirname);

   // 添加 TypeScript 支持
   config.resolver.sourceExts = [
     'js',
     'jsx',
     'ts',
     'tsx',
     'json',
     'cjs' // 如果需要支持 CommonJS
   ];

   // 添加 asset 支持
   config.resolver.assetExts = [
     ...config.resolver.assetExts.filter(ext => ext !== 'svg'),
     'bin'
   ];

   module.exports = config;