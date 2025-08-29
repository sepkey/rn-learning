// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettier = require("eslint-plugin-prettier/recommended");
const reactNative = require("eslint-plugin-react-native");

module.exports = defineConfig([
  expoConfig,
  prettier,
  {
    ignores: ["dist/*"],
    plugins: {
      "react-native": reactNative,
    },
    rules: {
      "react-native/no-unused-styles": "error",
    },
  },
]);
