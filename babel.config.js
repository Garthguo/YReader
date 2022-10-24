module.exports = function (api) {
  api.cache(true);
  console.log(11);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            // This needs to be mirrored in tsconfig.json
            components: './src/components',
            src: './src',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
