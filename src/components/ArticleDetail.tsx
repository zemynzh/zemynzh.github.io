import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useIntlayer } from 'react-intlayer'
import Header from './Header'
import Footer from './Footer'
import { Article } from '../types/content'
import { loadArticleById } from '../utils/contentLoader'
import MarkdownRenderer from './MarkdownRenderer'

const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const content = useIntlayer('app')
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return
      
      try {
        setLoading(true)
        setError(null)
        
        const articleData = await loadArticleById(slug)
        if (articleData) {
          setArticle(articleData)
        } else {
          setError('文章未找到')
        }
      } catch (err) {
        setError('加载文章失败')
        console.error('加载文章失败:', err)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-apple-gray to-white font-sf">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-apple-blue mb-4"></div>
            <p className="text-gray-600 text-lg">{content.articles?.loading || content.common?.loading}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-apple-gray to-white font-sf">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{content.articles?.noResults?.title || '文章未找到'}</h1>
            <p className="text-gray-600 mb-6">{error || content.articles?.noResults?.description || '请求的文章不存在'}</p>
            <button
              onClick={() => navigate('/articles')}
              className="px-6 py-3 bg-apple-blue text-white rounded-xl hover:bg-apple-blue-dark transition-colors"
            >
              {content.articles?.list?.title || '返回文章列表'}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray to-white font-sf">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 文章头部信息 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 面包屑导航 */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <button
                onClick={() => navigate('/articles')}
                className="hover:text-apple-blue transition-colors"
              >
                {content.articles?.list?.title || content.articles?.title || '文章列表'}
              </button>
              <span>→</span>
              <span>{article.category}</span>
              <span>→</span>
              <span className="text-gray-900">{article.title}</span>
            </nav>

            {/* 文章标题 */}
            <h1 className="text-4xl md:text-5xl font-bold text-apple-dark mb-6 leading-tight">
              {article.title}
            </h1>

            {/* 文章元信息 */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-apple-blue/10 text-apple-blue text-sm rounded-full font-medium">
                  {article.category}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{article.readTime}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{article.author}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(article.date).toLocaleDateString('zh-CN')}</span>
              </div>
            </div>

            {/* 文章摘要 */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* 文章标签 */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-apple-blue hover:text-white transition-colors cursor-pointer"
                  onClick={() => navigate(`/articles?tag=${tag}`)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 文章内容 */}
          <motion.div
            className="prose-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MarkdownRenderer content={article.content} />
          </motion.div>

          {/* 文章底部 */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/articles')}
                className="flex items-center gap-2 text-apple-blue hover:text-apple-blue-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {content.articles?.list?.title || '返回文章列表'}
              </button>
              
              <div className="text-sm text-gray-500">
                最后更新：{new Date(article.date).toLocaleDateString('zh-CN')}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ArticleDetail
