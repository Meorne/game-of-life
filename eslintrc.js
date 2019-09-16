import path from path

module.exports = {
  extends: [
    `eslint:recommended`,
    `plugin:react/recommended`,
    `airbnb`
  ],
  parser: `babel-eslint`,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    node: true
  },
  plugins: [
    `react`,
    `babel`,
    `jsdoc`
  ],
  settings: {
    react: {
      createClass: `createClass`,
      pragma: `React`,
      version: `16.5.1`
    }
  },
  rules: {
    "global-require": 1,
    "import/no-dynamic-require": 1,
    "no-useless-escape": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": {
      node: {
        paths: [
          path.resolve(__dirname, `src`)
        ]
      }
    },
    "comma-dangle": [`error`, {
      arrays: `never`,
      objects: `never`,
      imports: `never`,
      exports: `never`,
      functions: `ignore`
    }],
    "react/jsx-filename-extension": [1, { extensions: [`.js`, `.jsx`] }],
    quotes: [`error`, `backtick`],
    indent: [
      `error`,
      2
    ],
    semi: [`error`, `never`],
    "react/forbid-prop-types": 0,
    "no-multiple-empty-lines": [`error`, { max: 1, maxEOF: 1 }],
    "class-methods-use-this": 0,
    "import/no-extraneous-dependencies": [`error`, { devDependencies: true }],
    "react/jsx-no-bind": [
      1,
      {}
    ],
    "import/no-named-as-default": 0,
    "no-console": ["error", { allow: ["info", "error"] }],
    "valid-jsdoc": [
      "error",
      {
        "prefer": {
          "return": "returns"
        },
        "preferType": {
          "String": "string",
          "Number": "number",
          "Integer": "number",
          "integer": "number",
          "int": "number",
          "float": "number",
          "Float": "number",
          "double": "number",
          "Double": "number",
          "short": "number",
          "Short": "number",
          "boolean": "bool",
          "Boolean": "bool",
          "Bool": "bool",
          "Node": "node",
          "Object": "object",
          "Function": "func",
          "function": "func",
          "Array": "array"
        },
        "requireParamType": true,
        "requireReturn": false,
        "requireParamDescription": false,
        "requireReturnDescription": false
      }
    ],
    "jsdoc/check-examples": 1,
    "jsdoc/check-tag-names": 1,
    "jsdoc/newline-after-description": 1,
    "jsdoc/require-description-complete-sentence": 1,
    "jsdoc/require-param-name": 1,
    "jsdoc/require-param-type": 1,
    "jsdoc/require-returns-type": 1,
    "jsdoc/valid-types": 1,
    "one-var": ["error", { "initialized": "never" }],
    "default-case": ["error", { "commentPattern": "^skip\\sdefault" }]
  }
}
