import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntlayer } from 'react-intlayer'

const Footer: React.FC = () => {
  const content = useIntlayer('app')
  const navigate = useNavigate()
  const location = useLocation()

  // 处理导航到页面顶部的函数
  const handleNavigation = (path: string) => {
    if (location.pathname === path) {
      // 如果已经在当前页面，滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // 如果是新页面，先导航，然后在组件挂载后滚动到顶部
      navigate(path)
      // 使用 setTimeout 确保页面导航完成后再滚动
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <footer className="bg-apple-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* 主要内容区域 - 采用3列对称布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* 左侧：品牌信息 */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-gradient mb-6">Zemyn</h3>
              <p className="text-gray-300 mb-8 leading-relaxed max-w-sm mx-auto lg:mx-0">
                {content.footer?.description}
              </p>
              {/* 社交媒体图标 - 居中对齐 */}
              <div className="flex justify-center lg:justify-start space-x-6">
                <a href="https://github.com/zemynzh" target="_blank" rel="noopener noreferrer" className="group p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/zemynzh" target="_blank" rel="noopener noreferrer" className="group p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/zemynzh" target="_blank" rel="noopener noreferrer" className="group p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.665 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* 中间：快速链接 - 居中对齐 */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-8 text-white">{content.footer?.quickNav}</h4>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => handleNavigation('/')}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline decoration-2 underline-offset-4 cursor-pointer"
                  >
                    {content.nav?.home || content.common?.home}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/articles')}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline decoration-2 underline-offset-4 cursor-pointer"
                  >
                    {content.nav?.articles || content.common?.articles}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/tags')}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline decoration-2 underline-offset-4 cursor-pointer"
                  >
                    {content.nav?.tags || content.common?.tags}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/about')}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline decoration-2 underline-offset-4 cursor-pointer"
                  >
                    {content.nav?.about || content.common?.about}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/contact')}
                    className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline decoration-2 underline-offset-4 cursor-pointer"
                  >
                    {content.nav?.contact || content.common?.contact}
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* 右侧：联系信息 - 右对齐 */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-right">
              <h4 className="text-xl font-semibold mb-8 text-white">{content.footer?.contactUs || content.common?.contact}</h4>
              <ul className="space-y-4">
                <li className="flex items-center justify-center lg:justify-end space-x-3">
                  <svg className="h-5 w-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:zemynzh@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                    zemynzh@gmail.com
                  </a>
                </li>
                <li className="flex items-center justify-center lg:justify-end space-x-3">
                  <svg className="h-5 w-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/zemynzh" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                    @zemynzh
                  </a>
                </li>
                <li className="flex items-center justify-center lg:justify-end space-x-3">
                  <svg className="h-5 w-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <a href="https://linkedin.com/in/zemynzh" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
                    zemynzh
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* 分隔线和版权信息 */}
        <motion.div
          className="border-t border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              {content.footer?.copyright}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {content.footer?.madeWith}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 