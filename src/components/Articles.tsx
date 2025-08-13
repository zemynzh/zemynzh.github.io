import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useIntlayer, useLocale } from 'react-intlayer'
import Header from './Header'
import Footer from './Footer'
import { Article } from '../types/content'
import { 
  loadAllArticles,
  searchArticles,
  getAllTagsFromArticles,
  getAllCategoriesFromArticles
} from '../utils/contentLoader'

const Articles: React.FC = () => {
  const navigate = useNavigate()
  const { locale } = useLocale()
  const content = useIntlayer('app')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)

  const [categories, setCategories] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])

  // 加载文章和分类数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // 加载文章数据
        const articlesData = await loadAllArticles()
        setArticles(articlesData)
        setTotalArticles(articlesData.length)
        
        // 加载分类和标签
        const categoriesData = await getAllCategoriesFromArticles()
        const tagsData = await getAllTagsFromArticles()
        
        setCategories([content.articles?.filters?.allCategories || '', ...categoriesData])
        setAllTags([content.articles?.filters?.allTags || '', ...tagsData])
        
        // 计算分页
        const totalPages = Math.ceil(articlesData.length / 10)
        setTotalPages(totalPages)
        
      } catch (error) {
        console.error('加载数据失败:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [content, locale]) // 添加 content 和 locale 作为依赖项

  // 处理筛选变化
  useEffect(() => {
    const filterArticles = async () => {
      try {
        setLoading(true)
        let filteredArticles: Article[] = []
        
        // 根据搜索词筛选
        if (searchTerm.trim()) {
          filteredArticles = await searchArticles(searchTerm)
        } else {
          filteredArticles = await loadAllArticles()
        }
        
        // 根据分类筛选
        if (selectedCategory && selectedCategory !== content.articles?.filters?.allCategories) {
          filteredArticles = filteredArticles.filter(article => 
            article.category === selectedCategory
          )
        }
        
        // 根据标签筛选
        if (selectedTag && selectedTag !== content.articles?.filters?.allTags) {
          filteredArticles = filteredArticles.filter(article => 
            article.tags.includes(selectedTag)
          )
        }
        
        setArticles(filteredArticles)
        setTotalArticles(filteredArticles.length)
        setCurrentPage(1)
        
        // 重新计算分页
        const totalPages = Math.ceil(filteredArticles.length / 10)
        setTotalPages(totalPages)
        
      } catch (error) {
        console.error('筛选文章失败:', error)
      } finally {
        setLoading(false)
      }
    }
    
    filterArticles()
  }, [searchTerm, selectedCategory, selectedTag])

  // 分页处理
  const pageSize = 10
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentArticles = articles.slice(startIndex, endIndex)

  // 分页导航
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray to-white font-sf">
      <Header />
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 页面标题 */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-apple-dark mb-4">
              {content.articles?.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.articles?.subtitle}
            </p>
          </motion.div>

          {/* 搜索和筛选区域 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card p-6">
              {/* 搜索框 */}
              <div className="mb-6">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder={content.articles?.search?.placeholder}
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* 筛选器 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 分类筛选 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{content.articles?.filters?.category}</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-200"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* 标签筛选 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{content.articles?.filters?.tag}</label>
                  <select
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-200"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                  >
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 查看所有标签按钮 */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/tags')}
                  className="inline-flex items-center px-4 py-2 text-apple-blue hover:text-apple-blue-dark font-medium transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {content.articles?.viewAllTags}
                </button>
              </div>
            </div>
          </motion.div>

          {/* 文章列表 */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-apple-dark">
                {content.articles?.list?.title}
              </h2>
              <span className="text-gray-600">
                {(() => {
                  // 处理不同语言的 locale 映射
                  let localeKey = locale;
                  if (locale === 'zh-Hans') localeKey = 'zh-CN';
                  
                  const template = content.articles?.list?.totalCount?.[localeKey];
                  if (template) {
                    return template.replace('{count}', totalArticles.toString());
                  }
                  return content.articles?.list?.totalCount?.[localeKey]?.replace('{count}', totalArticles.toString()) || `共 ${totalArticles} 篇文章`;
                })()}
              </span>
            </div>

            {/* 加载状态 */}
            {loading && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
                <p className="mt-4 text-gray-600">{content.articles?.loading}</p>
              </motion.div>
            )}

            {currentArticles.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{content.articles?.noResults?.title}</h3>
                <p className="text-gray-500">{content.articles?.noResults?.description}</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {currentArticles.map((article: Article, index: number) => (
                  <motion.article
                    key={article.id}
                    className="card p-6 hover:shadow-2xl transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-apple-blue/10 text-apple-blue text-xs rounded-full font-medium">
                          {article.category}
                        </span>
                        <span className="text-sm text-gray-500">{article.readTime} {content.articles?.article?.readTime}</span>
                      </div>
                      <h3 
                        className="text-xl font-semibold text-apple-dark mb-3 hover:text-apple-blue transition-colors cursor-pointer"
                        onClick={() => navigate(`/article/${article.slug}`)}
                      >
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.author}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-apple-blue hover:text-white transition-colors cursor-pointer"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button 
                        className="text-apple-blue hover:text-apple-blue-dark font-medium text-sm transition-colors"
                        onClick={() => navigate(`/article/${article.slug}`)}
                      >
                                                 {content.articles?.article?.readFull}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

          {/* 分页 */}
          {currentArticles.length > 0 && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <nav className="flex items-center gap-2">
                <button 
                  className="px-4 py-2 text-gray-500 hover:text-apple-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {content.articles?.pagination?.previous}
                </button>
                
                {/* 页码显示 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`px-4 py-2 transition-colors ${
                      page === currentPage
                        ? 'text-apple-blue font-medium bg-apple-blue/10 rounded-lg'
                        : 'text-gray-500 hover:text-apple-blue'
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className="px-4 py-2 text-gray-500 hover:text-apple-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {content.articles?.pagination?.next}
                </button>
              </nav>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Articles
