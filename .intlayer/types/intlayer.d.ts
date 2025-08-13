/* eslint-disable */
import { Locales } from 'intlayer';
import _QQTKBLjOx50SQy0kDGSB from './app.ts';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    "app": typeof _QQTKBLjOx50SQy0kDGSB;
  }

  type DeclaredLocales = Locales.ENGLISH;
  type RequiredLocales = Locales.ENGLISH;
  type ExtractedLocales = Extract<Locales, RequiredLocales>;
  type ExcludedLocales = Exclude<Locales, RequiredLocales>;
  interface IConfigLocales<Content> extends Record<ExtractedLocales, Content>, Partial<Record<ExcludedLocales, Content>> {}
}