const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure TypeScript files are properly handled
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx'];

// Add transformer configuration for TypeScript
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
};

// Ensure expo-modules-core is properly transpiled
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;