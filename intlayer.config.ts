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
    strictMode: "inclusive", // 严格模式：要求所有声明的语言环境都有翻译
  },

  // 内容配置
  content: {
    contentDir: ["src"], // 内容文件目录
    fileExtensions: [".content.ts", ".content.tsx"], // 内容文件扩展名
    watch: false, // 禁用文件监视以提高构建性能
    baseDir: ".", // 使用相对路径
    dictionaryOutput: ["intlayer"], // 输出类型
    dictionariesDir: ".intlayer/dictionaries", // 词典输出目录
    moduleAugmentationDir: ".intlayer/types", // 类型增强目录
  },

  // 中间件配置
  middleware: {
    headerName: "x-intlayer-locale", // 区域设置 HTTP 头名称
    cookieName: "intlayer-locale", // 区域设置 Cookie 名称
    prefixDefault: false, // 不在 URL 中包含默认区域设置
    basePath: "", // 应用基本路径
    noPrefix: false, // 保留 URL 中的区域设置前缀
    detectLocaleOnPrefetchNoPrefix: false, // 预取时不检测区域设置
  },

  // 编辑器配置（生产环境禁用）
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
    optimize: true, // 始终启用优化
    importMode: "static", // 使用静态导入以提高性能
    traversePattern: [
      "src/**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/*.d.ts"
    ], // 优化期间遍历的文件模式
  },

  // AI 配置（禁用）
  ai: {
    provider: "none",
    apiKey: "",
    applicationContext: "",
  },
};

export default config; 