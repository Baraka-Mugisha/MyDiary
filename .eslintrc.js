module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "class-methods-use-this": 0,
    "no-tabs": 0,
    "allowIndentationTabs": 0,
    "import/prefer-default-export": "off"
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
    "indent": [
      "error",
      "tab"
    ],
    "comma-dangle": 0,
    "trailing-comma": 0,
    "quote-props": 0,
    "no-unused-vars": 0,
    "linebreak-style": 0,
    "consistent-return": 0,
    "no-shadow": 0
  },
};