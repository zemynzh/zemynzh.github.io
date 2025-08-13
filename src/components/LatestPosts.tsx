import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useIntlayer } from 'react-intlayer'
import { loadAllArticles } from '../utils/contentLoader'
import { Article } from '../types/content'

const LatestPosts: React.FC = () => {
  const navigate = useNavigate()
  const content = useIntlayer('app')
  const [posts, setPosts] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  // 加载最新的文章数据
  useEffect(() => {
    const loadLatestPosts = async () => {
      try {
        setLoading(true)
        const allArticles = await loadAllArticles()
        // 只显示最新的3篇文章
        const latestPosts = allArticles.slice(0, 3)
        setPosts(latestPosts)
      } catch (error) {
        console.error('加载最新文章失败:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLatestPosts()
  }, [])

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    navigate(`/articles?tag=${encodeURIComponent(tag)}`)
  }

  // 处理文章点击
  const handleArticleClick = (slug: string) => {
    navigate(`/article/${slug}`)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-apple-dark mb-4">
            {content.latestPosts?.title || '最新文章'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.latestPosts?.subtitle || '分享最新的技术见解和编程心得，帮助你在技术道路上不断进步'}
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            <p className="mt-4 text-gray-600">{content.latestPosts?.loading || '正在加载最新文章...'}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="card p-6 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => handleArticleClick(post.slug)}
              >
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-apple-blue/10 text-apple-blue text-xs rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime} {content.articles?.article?.readTime || '分钟阅读'}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-apple-dark mb-2 hover:text-apple-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{post.date}</span>
                  <span>{post.author}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-apple-blue hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTagClick(tag)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link to="/articles" className="btn-secondary inline-block">
            {content.latestPosts?.viewMoreArticles || '查看更多文章'}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default LatestPosts 