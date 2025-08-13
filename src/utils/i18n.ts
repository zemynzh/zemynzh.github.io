import dictionary from '@intlayer/dictionary'

export function useTranslation() {
  return {
    t: (key: string) => {
      const keys = key.split('.')
      let result = dictionary.content
      
      for (const k of keys) {
        if (!result[k]) {
          console.warn(`Translation key not found: ${key}`)
          return key
        }
        result = result[k]
      }
      
      if (!result.translation) {
        console.warn(`No translation found for key: ${key}`)
        return key
      }
      
      // 默认返回中文
      return result.translation['zh-Hans'] || key
    }
  }
} 