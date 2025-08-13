import dictionary from '@intlayer/dictionary'

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

function isTranslationNode(node: any): node is TranslationNode {
  return (
    node &&
    typeof node === 'object' &&
    'nodeType' in node &&
    node.nodeType === 'translation' &&
    'translation' in node &&
    typeof node.translation === 'object' &&
    'zh-Hans' in node.translation
  )
}

export function useTranslation() {
  return {
    t: (key: string) => {
      const keys = key.split('.')
      let result: ContentNode | TranslationNode = dictionary.content

      for (const k of keys) {
        if (
          !result ||
          typeof result !== 'object' ||
          isTranslationNode(result) ||
          !(k in result)
        ) {
          console.warn(`Translation key not found: ${key}`)
          return key
        }
        result = result[k]
      }

      if (!isTranslationNode(result)) {
        console.warn(`No translation found for key: ${key}`)
        return key
      }

      return result.translation['zh-Hans'] || key
    }
  }
} 