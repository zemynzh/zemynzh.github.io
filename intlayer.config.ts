import { Locales, type IntlayerConfig } from "intlayer";
import path from 'path';

const config: IntlayerConfig = {
  // 国际化配置
  internationalization: {
    locales: [
      Locales.CHINESE_SIMPLIFIED,  // 中文简体
      Locales.ENGLISH,              // 英文
      Locales.JAPANESE,             // 日文
    ],
    defaultLocale: Locales.CHINESE_SIMPLIFIED,
    strictMode: "inclusive",
  },

  // 内容配置
  content: {
    contentDir: ["src"],
    fileExtensions: [".content.ts", ".content.tsx"],
    watch: false,
    baseDir: ".",
    dictionaryOutput: ["intlayer"],
    dictionariesDir: "src/locales",
    moduleAugmentationDir: "src/types",
  },

  // 中间件配置
  middleware: {
    headerName: "x-intlayer-locale",
    cookieName: "intlayer-locale",
    prefixDefault: false,
    basePath: "",
    noPrefix: false,
    detectLocaleOnPrefetchNoPrefix: false,
  },

  // 编辑器配置
  editor: {
    enabled: false,
    port: 8000,
    applicationURL: "",
    editorURL: "",
    cmsURL: "",
    backendURL: "",
    hotReload: false,
  },

  // 构建配置
  build: {
    optimize: true,
    importMode: "static",
    traversePattern: [
      "src/**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/*.d.ts"
    ],
  },

  // AI 配置
  ai: {
    provider: "none",
    apiKey: "",
    applicationContext: "",
  },
};

export default config; 