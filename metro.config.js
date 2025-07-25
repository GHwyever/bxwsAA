const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add TypeScript support
config.resolver.sourceExts.push('ts', 'tsx');
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

module.exports = config;