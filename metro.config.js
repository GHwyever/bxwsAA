const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add TypeScript support
config.resolver.sourceExts.push('ts', 'tsx');

// Configure transformer for TypeScript
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

// Add transform options
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: false,
  },
});

// Ensure node_modules are processed
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;