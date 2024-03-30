const path = require('path');

const checkTypesNextCommand = () => 'yarn next:check-types';

const buildHardhatEslintCommand = (filenames) =>
  `yarn hardhat:lint-staged --fix ${filenames
    .map((f) => path.relative(path.join('packages', 'hardhat'), f))
    .join(' ')}`;

module.exports = {
  'packages/nextjs/**/*.{ts,tsx}': [checkTypesNextCommand],
  'packages/hardhat/**/*.{ts,tsx}': [buildHardhatEslintCommand],
};
