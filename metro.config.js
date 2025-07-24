const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Explicitly configure transformer for TypeScript files
config.transformer = {
  babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
};

// Ensure TypeScript files are recognized
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'json'];

module.exports = config;