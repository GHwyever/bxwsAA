const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// 关键：添加TypeScript扩展名到sourceExts
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'ts',
  'tsx'
];

// 可选：如果有SVG或其他资源，添加assetExts
config.resolver.assetExts = [
  ...config.resolver.assetExts,
  'svg'
];

module.exports = config;