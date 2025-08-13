/* eslint-disable */
import { Locales } from 'intlayer';
import _T4xpsgnuAr7CQdme1u8S from './..\..\.intlayer\types\app.ts';

declare module '@intlayer/dictionary' {
  interface TranslationNode {
    nodeType: 'translation';
    translation: {
      'zh-Hans': string;
      en: string;
      ja: string;
    };
  }

  type ContentNode = {
    [key: string]: ContentNode | TranslationNode;
  }

  interface Dictionary {
    key: string;
    content: ContentNode;
  }

  const dictionary: Dictionary;
  export default dictionary;
}

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    "app": typeof _T4xpsgnuAr7CQdme1u8S;
  }

  type DeclaredLocales = Locales.CHINESE_SIMPLIFIED | Locales.ENGLISH | Locales.JAPANESE;
  type RequiredLocales = Locales.CHINESE_SIMPLIFIED | Locales.ENGLISH | Locales.JAPANESE;
  type ExtractedLocales = Extract<Locales, RequiredLocales>;
  type ExcludedLocales = Exclude<Locales, RequiredLocales>;
  interface IConfigLocales<Content> extends Record<ExtractedLocales, Content>, Partial<Record<ExcludedLocales, Content>> {}
}