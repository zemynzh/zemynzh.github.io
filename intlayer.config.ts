import { Locales, type IntlayerConfig } from "intlayer";

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
    watch: process.env.NODE_ENV === "development", // 开发模式下监视文件变化
    baseDir: process.cwd(), // 项目根目录
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

  // 编辑器配置
  editor: {
    applicationURL: process.env.INTLAYER_EDITOR_URL || "http://localhost:5173", // Vite 默认端口
    port: 8000, // 编辑器服务器端口
    editorURL: "http://localhost:8000", // 编辑器服务器 URL
    cmsURL: "https://intlayer.org", // Intlayer CMS URL
    backendURL: "https://back.intlayer.org", // 后端服务器 URL
    enabled: process.env.NODE_ENV !== "production", // 生产环境禁用编辑器
    hotReload: false, // 热重载（仅企业版支持）
  },

  // 构建配置
  build: {
    optimize: process.env.NODE_ENV === "production", // 生产环境启用优化
    importMode: "dynamic", // 使用 Suspense 动态导入词典
    traversePattern: [
      "src/**/*.{ts,tsx}",
      "!**/node_modules/**",
      "!**/*.d.ts"
    ], // 优化期间遍历的文件模式
  },

  // AI 配置（可选，用于自动翻译）
  ai: {
    provider: "openai", // AI 提供商
    apiKey: process.env.OPENAI_API_KEY, // API 密钥
    applicationContext: "这是一个多语言博客应用，支持中文、英文和日文。内容应该保持专业、友好的语调。",
  },
};

export default config; 