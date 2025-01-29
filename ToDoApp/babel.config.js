module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['react-native-reanimated/plugin', { loose: true }],
        ['@babel/plugin-transform-private-methods', { loose: true }]
    ],
  };