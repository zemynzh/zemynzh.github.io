declare module '@intlayer/dictionary' {
  interface Translation {
    nodeType: 'translation';
    translation: {
      'zh-Hans': string;
      en: string;
      ja: string;
    };
  }

  interface Content {
    [key: string]: Content | Translation;
  }

  interface Dictionary {
    key: string;
    content: Content;
  }

  const dictionary: Dictionary;
  export default dictionary;
} 