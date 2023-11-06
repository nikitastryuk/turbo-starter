module.exports = {
  '*.{js,cjs,mjs,ts,tsx}': 'eslint . --fix',
  '*.{ts,tsx}': () => 'tsc --pretty --noEmit',
  '*': 'prettier --write --ignore-unknown',
};
