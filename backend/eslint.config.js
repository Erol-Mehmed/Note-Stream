import { configApp } from '@adonisjs/eslint-config';

export default configApp({
  rules: {
    'no-console': 'warn',
    'no-trailing-spaces': 'error',
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
  },
});
