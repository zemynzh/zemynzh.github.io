declare module '@intlayer/dictionary' {
  interface Translation {
    nodeType: 'translation';
    translation: {
      'zh-Hans': string;
      en: string;
      ja: string;
    };
  }

  interface ContentObject {
    [key: string]: ContentObject | Translation;
  }

  interface Dictionary {
    key: string;
    content: ContentObject;
  }

  const dictionary: Dictionary;
  export default dictionary;
} 