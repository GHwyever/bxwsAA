const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure TypeScript files are handled properly
config.resolver.sourceExts.push('ts', 'tsx');

// Handle TypeScript files in node_modules
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

module.exports = config;