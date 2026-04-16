import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  // 검사 제외 대상
  { ignores: ['dist', 'coverage', 'cypress', '*.config.js'] },

  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // TypeScript — conventions.md: any 사용 절대 금지
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // 일반
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Prettier와 충돌하는 ESLint 규칙 비활성화 (반드시 마지막에)
  prettierConfig,
);
