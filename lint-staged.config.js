// @ts-check
/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*': 'prettier --write --ignore-unknown',
}
