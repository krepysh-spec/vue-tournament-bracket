import { defineConfig } from "eslint/config";
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from "globals";

export default defineConfig([
  {
    ignores: ['**/*.stories.*', 'src/stories/**'],
  },
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  },
  eslintConfigPrettier,
]);
