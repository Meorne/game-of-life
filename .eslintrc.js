module.exports = {
  extends: [
    `plugin:react/recommended`,
    `airbnb`,
    `airbnb/hooks`,
  ],
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },

  },
  settings: {
    react: {
      version: `detect`,
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [
    `react`,
  ],
  rules: {
    "global-require": 1,
    "import/no-dynamic-require": 0,
    'arrow-parens': [`error`, `as-needed`],
    quotes: [`error`, `backtick`],
    indent: [
      `error`,
      2,
    ],
    semi: [`error`, `never`],
    'react/no-array-index-key': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-has-content': 0,
    'eol-last': [`error`, `always`],
    'react-hooks/exhaustive-deps': 0,
    'no-underscore-dangle': 0,
    camelcase: 0,
    'react/function-component-definition': [2, { namedComponents: `arrow-function` }],
    'no-console': 0,
    'react/require-default-props': 0,
    'react/jsx-fragments': 0,
    'react/jsx-one-expression-per-line': [1, { allow: `single-child` }],
    'no-param-reassign': 0,
    'react/forbid-prop-types': 0,
    'no-bitwise': 0,
    'no-plusplus': 0,
    'no-shadow': 0,
    'default-param-last': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/media-has-caption': 0,
    'import/no-unresolved': [
      `error`,
      {
        ignore: [
          `src/`,
        ],
      },
    ],
    'import/no-extraneous-dependencies': [
      `error`,
      {
        devDependencies: true,
      },
    ],
    'no-case-declarations': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          `.js`,
          `.jsx`,
        ],
      },
    ],
  },
}
