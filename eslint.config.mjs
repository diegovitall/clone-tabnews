import js from "@eslint/js";
import globals from "globals";
import pluginJest from "eslint-plugin-jest";
import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";

const config = [
  // ** CONFIGURAÇÕES GLOBAIS DE BASE **

  // 1. "eslint:recommended"
  js.configs.recommended,

  // 2. "next/core-web-vitals"
  ...nextConfig,

  // 3. Configuração do Jest (Substitui "plugin:jest/recommended")
  {
    // Aplica esta configuração apenas a arquivos de teste
    files: ["**/?(*.)+(spec|test).[jt]s?(x)"],

    // Define o plugin (como você apontou, precisa ser um objeto)
    plugins: {
      jest: pluginJest,
    },

    // Aplica as regras recomendadas do plugin Jest
    // O objeto 'pluginJest.configs.recommended' já contém as regras e as variáveis
    // globais, mas precisamos integrá-lo corretamente ao array principal.

    // NOTA: Em muitos casos, simplesmente usar ...pluginJest.configs.recommended
    // pode não funcionar diretamente se a config não for um "flat config" pronto.
    // O jeito mais seguro é aplicar o objeto 'rules' e 'languageOptions' separadamente:

    // Adiciona as regras (equivalente a "plugin:jest/recommended")
    rules: pluginJest.configs.recommended.rules,

    // Adiciona variáveis globais de ambiente (como 'describe', 'it', 'expect')
    languageOptions: {
      globals: globals.jest,
    },

    // Alternativamente, se o plugin tiver suporte total a Flat Config, poderíamos usar:
    // ...pluginJest.configs.recommended
  },

  // ** CONFIGURAÇÃO DE AMBIENTE **

  {
    // Opções de ambiente/linguagem para o restante dos arquivos
    languageOptions: {
      // Adiciona variáveis globais de Node e Browser
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: "module",
    },
  },

  // ** CONFIGURAÇÃO DE FORMATAÇÃO **

  // 4. "prettier" (DEVE ser o ÚLTIMO item no array)
  prettierConfig,
];

export default config;
