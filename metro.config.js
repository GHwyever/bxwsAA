const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Ensure TypeScript files are handled properly
config.resolver.sourceExts.push('ts', 'tsx');

// Handle TypeScript files in node_modules
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

// Explicitly configure transform options to ensure node_modules are processed
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;