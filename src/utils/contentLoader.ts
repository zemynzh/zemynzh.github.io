import { Article, Tag, Category } from '../types/content'

// 动态导入所有文章元数据
const importAllPosts = () => {
  const posts = (import.meta as any).glob('../content/posts/*/meta.json', { eager: true })
  return posts
}

// 读取Markdown文件内容
const readMarkdownFile = async (postId: string): Promise<string> => {
  try {
    // 在开发环境中，使用fetch读取文件
    const response = await fetch(`/src/content/posts/${postId}/index.md`)
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown file: ${response.statusText}`)
    }
    return await response.text()
  } catch (error) {
    console.error(`读取Markdown文件失败 ${postId}:`, error)
    return ''
  }
}

// 加载所有文章
export const loadAllArticles = async (): Promise<Article[]> => {
  try {
    const posts = importAllPosts()
    const articles: Article[] = []
    
    for (const path in posts) {
      const postId = path.split('/')[3] // 提取文章ID
      const meta = posts[path] as any
      
      // 获取文章内容
      const content = await readMarkdownFile(postId)
      
      const article: Article = {
        id: meta.id || postId,
        title: meta.title,
        excerpt: meta.excerpt,
        content: content,
        date: meta.date,
        tags: meta.tags || [],
        readTime: meta.readTime,
        author: meta.author,
        category: meta.category,
        featured: meta.featured || false,
        slug: meta.slug || postId
      }
      
      articles.push(article)
    }
    
    // 按日期排序（最新的在前）
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('加载文章失败:', error)
    return []
  }
}

// 根据ID加载单篇文章
export const loadArticleById = async (id: string): Promise<Article | null> => {
  try {
    const articles = await loadAllArticles()
    return articles.find(article => article.id === id || article.slug === id) || null
  } catch (error) {
    console.error('加载文章失败:', error)
    return null
  }
}

// 根据标签加载文章
export const loadArticlesByTag = async (tag: string): Promise<Article[]> => {
  try {
    const articles = await loadAllArticles()
    return articles.filter(article => 
      article.tags.some((t: string) => t.toLowerCase() === tag.toLowerCase())
    )
  } catch (error) {
    console.error('根据标签加载文章失败:', error)
    return []
  }
}

// 根据分类加载文章
export const loadArticlesByCategory = async (category: string): Promise<Article[]> => {
  try {
    const articles = await loadAllArticles()
    return articles.filter(article => 
      article.category.toLowerCase() === category.toLowerCase()
    )
  } catch (error) {
    console.error('根据分类加载文章失败:', error)
    return []
  }
}

// 搜索文章
export const searchArticles = async (query: string): Promise<Article[]> => {
  try {
    const articles = await loadAllArticles()
    const lowerQuery = query.toLowerCase()
    
    return articles.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
    )
  } catch (error) {
    console.error('搜索文章失败:', error)
    return []
  }
}

// 加载标签数据
export const loadTags = async (): Promise<Tag[]> => {
  try {
    const tagsModule = await import('../content/tags.json')
    return tagsModule.default || []
  } catch (error) {
    console.error('加载标签失败:', error)
    return []
  }
}

// 加载分类数据
export const loadCategories = async (): Promise<Category[]> => {
  try {
    const categoriesModule = await import('../content/categories.json')
    return categoriesModule.default || []
  } catch (error) {
    console.error('加载分类失败:', error)
    return []
  }
}

// 获取所有标签（从文章中提取）
export const getAllTagsFromArticles = async (): Promise<string[]> => {
  try {
    const articles = await loadAllArticles()
    const tagSet = new Set<string>()
    
    articles.forEach(article => {
      article.tags.forEach(tag => tagSet.add(tag))
    })
    
    return Array.from(tagSet).sort()
  } catch (error) {
    console.error('获取标签失败:', error)
    return []
  }
}

// 获取所有分类（从文章中提取）
export const getAllCategoriesFromArticles = async (): Promise<string[]> => {
  try {
    const articles = await loadAllArticles()
    const categorySet = new Set<string>()
    
    articles.forEach(article => {
      categorySet.add(article.category)
    })
    
    return Array.from(categorySet).sort()
  } catch (error) {
    console.error('获取分类失败:', error)
    return []
  }
}

// 分页加载文章
export const loadArticlesWithPagination = async (
  page: number = 1, 
  pageSize: number = 10
): Promise<{ articles: Article[], total: number, totalPages: number }> => {
  try {
    const allArticles = await loadAllArticles()
    const total = allArticles.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    
    const articles = allArticles.slice(startIndex, endIndex)
    
    return {
      articles,
      total,
      totalPages
    }
  } catch (error) {
    console.error('分页加载文章失败:', error)
    return {
      articles: [],
      total: 0,
      totalPages: 0
    }
  }
}
