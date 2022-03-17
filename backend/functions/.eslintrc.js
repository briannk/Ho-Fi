module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google", "prettier"],
  rules: {
    "linebreak-style": 0,
    "object-curly-spacing": [2, "always"],
  },
};
