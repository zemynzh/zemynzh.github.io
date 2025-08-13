import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useIntlayer } from 'react-intlayer'
import Header from './Header'
import Footer from './Footer'
import { Article } from '../types/content'
import { 
  loadAllArticles, 
  loadArticlesByTag,
  getAllTagsFromArticles 
} from '../utils/contentLoader'

interface TagInfo {
  name: string
  count: number
  color: string
}

const Tags: React.FC = () => {
  const content = useIntlayer('app')
  const navigate = useNavigate()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [tags, setTags] = useState<TagInfo[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [tagArticles, setTagArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  // 预定义的标签颜色
  const tagColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-yellow-500 to-yellow-600',
    'from-teal-500 to-teal-600',
    'from-gray-500 to-gray-600',
    'from-emerald-500 to-emerald-600',
    'from-rose-500 to-rose-600',
    'from-cyan-500 to-cyan-600',
    'from-lime-500 to-lime-600',
    'from-amber-500 to-amber-600',
    'from-violet-500 to-violet-600'
  ]

  // 加载文章和标签数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // 加载所有文章
        const articlesData = await loadAllArticles()
        setArticles(articlesData)
        
        // 获取所有标签
        const allTags = await getAllTagsFromArticles()
        
        // 为每个标签计算文章数量并分配颜色
        const tagsWithCount: TagInfo[] = allTags.map((tagName, index) => {
          const count = articlesData.filter(article => 
            article.tags.includes(tagName)
          ).length
          
          return {
            name: tagName,
            count,
            color: tagColors[index % tagColors.length]
          }
        })
        
        // 按文章数量排序
        tagsWithCount.sort((a, b) => b.count - a.count)
        setTags(tagsWithCount)
        
      } catch (error) {
        console.error(content.tags?.errors?.loadDataFailed || content.common?.error || 'Error', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // 处理标签点击
  const handleTagClick = async (tagName: string) => {
    if (selectedTag === tagName) {
      setSelectedTag(null)
      setTagArticles([])
    } else {
      setSelectedTag(tagName)
      try {
        const articlesByTag = await loadArticlesByTag(tagName)
        setTagArticles(articlesByTag)
      } catch (error) {
        console.error(content.tags?.errors?.loadTagArticlesFailed || content.common?.error || 'Error', error)
        setTagArticles([])
      }
    }
  }

  // 过滤标签
  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 跳转到文章详情
  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      {/* 主要内容 */}
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 页面标题 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-apple-dark to-apple-blue bg-clip-text text-transparent mb-4">
              {content.tags?.title || content.nav?.tags || content.common?.tags}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {content.tags?.subtitle}
            </p>
          </motion.div>

          {/* 搜索栏 */}
          <motion.div 
            className="max-w-md mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content.tags?.searchPlaceholder}
                className="w-full px-6 py-4 pl-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-apple-blue/20 focus:border-apple-blue transition-all duration-300 dark:text-white dark:placeholder-gray-400 shadow-lg"
              />
              <svg 
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>

          {/* 加载状态 */}
          {loading && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
              <p className="mt-4 text-gray-600">{content.tags?.loading}</p>
            </motion.div>
          )}

          {/* 标签网格 */}
          {!loading && (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {filteredTags.map((tag, index) => (
                <motion.div
                  key={tag.name}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTagClick(tag.name)}
                >
                  <div className={`
                    relative p-6 rounded-2xl bg-gradient-to-br ${tag.color} 
                    shadow-lg hover:shadow-xl transition-all duration-300 
                    transform hover:-translate-y-1
                    ${selectedTag === tag.name ? 'ring-4 ring-white/30 scale-105' : ''}
                  `}>
                    {/* 标签名称 */}
                    <h3 className="text-white font-semibold text-lg text-center mb-2">
                      {tag.name}
                    </h3>
                    
                    {/* 文章数量 */}
                    <div className="text-center">
                      <span className="text-white/80 text-sm">
                        {tag.count} {content.tags?.articlesCount}
                      </span>
                    </div>

                    {/* 选中状态指示器 */}
                    {selectedTag === tag.name && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-4 h-4 text-apple-blue" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* 选中标签的详细信息 */}
          {selectedTag && tagArticles.length > 0 && (
            <motion.div 
              className="mt-16 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {content.tags?.tagLabel}{selectedTag}
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedTag(null)
                      setTagArticles([])
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    {content.tags?.foundArticles?.replace('{count}', tagArticles.length.toString())?.replace('{tag}', selectedTag)}
                  </p>
                  
                  {/* 相关文章列表 */}
                  <div className="grid gap-4">
                    {tagArticles.map((article, index) => (
                      <motion.div 
                        key={article.id}
                        className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => handleArticleClick(article.slug)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {article.title}
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{article.date}</span>
                          <span>{article.readTime} {content.articles?.article?.readTime}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 统计信息 */}
          {!loading && (
            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {content.tags?.statistics?.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-apple-blue mb-2">
                      {tags.length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">{content.tags?.statistics?.totalTags}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-500 mb-2">
                      {articles.length}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">{content.tags?.statistics?.totalArticles}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-500 mb-2">
                      {tags.length > 0 ? Math.round(articles.length / tags.length) : 0}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">{content.tags?.statistics?.averageArticlesPerTag}</div>
                  </div>
                </div>
                
                {/* 查看所有文章按钮 */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => navigate('/articles')}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-apple-blue to-apple-blue-dark text-white font-medium rounded-xl hover:from-apple-blue-dark hover:to-apple-blue transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    {content.tags?.viewAllArticles}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Tags
