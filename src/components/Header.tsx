import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale, useIntlayer } from 'react-intlayer'
import { Locales } from 'intlayer'
import { Link, useLocation } from 'react-router-dom'
import avatarImage from '../../public/avatar.jpg'

const Header: React.FC = () => {
  const { locale, setLocale } = useLocale()
  const content = useIntlayer('app')
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  // 监听滚动事件，实现导航栏背景变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 点击外部区域关闭语言下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isLanguageDropdownOpen && !target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isLanguageDropdownOpen])

  const handleLanguageChange = (newLocale: Locales) => {
    setLocale(newLocale)
  }

  // 页面切换时自动滚动到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // 实现搜索逻辑
      console.log('搜索:', searchQuery)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-apple-blue to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-apple-dark to-apple-blue bg-clip-text text-transparent">
                Zemyn
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="nav-link dark:text-gray-300 dark:hover:text-white">{content.nav.home}</Link>
            <Link to="/articles" className="nav-link dark:text-gray-300 dark:hover:text-white">{content.nav.articles}</Link>
            <Link to="/tags" className="nav-link dark:text-gray-300 dark:hover:text-white">{content.nav.tags}</Link>
            <Link to="/about" className="nav-link dark:text-gray-300 dark:hover:text-white">{content.nav.about}</Link>
            <Link to="/contact" className="nav-link dark:text-gray-300 dark:hover:text-white">{content.nav.contact}</Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-apple-blue dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>

            {/* Language Switcher */}
            <div className="hidden md:flex items-center relative language-dropdown">
              <motion.button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Language Flag Icon */}
                <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-500">
                  {locale === Locales.CHINESE_SIMPLIFIED && (
                    <div className="w-full h-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">中</div>
                  )}
                  {locale === Locales.ENGLISH && (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">EN</div>
                  )}
                  {locale === Locales.JAPANESE && (
                    <div className="w-full h-full bg-red-400 flex items-center justify-center text-white text-xs font-bold">日</div>
                  )}
                </div>
                <span className="text-sm font-medium">
                  {locale === Locales.CHINESE_SIMPLIFIED && content.language.chinese}
                  {locale === Locales.ENGLISH && content.language.english}
                  {locale === Locales.JAPANESE && content.language.japanese}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="py-2">
                      <button
                        onClick={() => {
                          handleLanguageChange(Locales.CHINESE_SIMPLIFIED)
                          setIsLanguageDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          locale === Locales.CHINESE_SIMPLIFIED ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">中</div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{content.language.chinese}</span>
                        {locale === Locales.CHINESE_SIMPLIFIED && (
                          <svg className="w-4 h-4 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      <button
                        onClick={() => {
                          handleLanguageChange(Locales.ENGLISH)
                          setIsLanguageDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          locale === Locales.ENGLISH ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">EN</div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{content.language.english}</span>
                        {locale === Locales.ENGLISH && (
                          <svg className="w-4 h-4 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      
                      <button
                        onClick={() => {
                          handleLanguageChange(Locales.JAPANESE)
                          setIsLanguageDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          locale === Locales.JAPANESE ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white text-xs font-bold">日</div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{content.language.japanese}</span>
                        {locale === Locales.JAPANESE && (
                          <svg className="w-4 h-4 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 cursor-pointer">
                <img 
                  src={avatarImage} 
                  alt={content.profile?.avatar || '个人头像'} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 如果图片加载失败，显示默认头像
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                {/* 默认头像 - 当图片加载失败时显示 */}
                <div className="w-full h-full bg-gradient-to-br from-apple-blue to-blue-600 flex items-center justify-center text-white font-medium text-sm">
                  Z
                </div>
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-apple-blue dark:hover:text-blue-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="py-4 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={content.search.placeholder}
                  className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-apple-blue focus:border-transparent transition-all duration-200 dark:text-white dark:placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-apple-blue transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="px-4 py-6 space-y-4">
              <nav className="space-y-3">
                <Link to="/" className="mobile-nav-link dark:text-gray-300 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{content.nav.home}</Link>
                <Link to="/articles" className="mobile-nav-link dark:text-gray-300 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{content.nav.articles}</Link>
                <Link to="/tags" className="mobile-nav-link dark:text-white dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{content.nav.tags}</Link>
                <Link to="/about" className="mobile-nav-link dark:text-gray-300 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{content.nav.about}</Link>
                <Link to="/contact" className="mobile-nav-link dark:text-gray-300 dark:hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>{content.nav.contact}</Link>
              </nav>
              
              <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="space-y-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{content.language.languageLabel}</span>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handleLanguageChange(Locales.CHINESE_SIMPLIFIED)}
                      className={`w-full px-4 py-3 flex items-center space-x-3 rounded-lg transition-colors ${
                        locale === Locales.CHINESE_SIMPLIFIED 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">中</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{content.language.chinese}</span>
                      {locale === Locales.CHINESE_SIMPLIFIED && (
                        <svg className="w-4 h-4 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => handleLanguageChange(Locales.ENGLISH)}
                      className={`w-full px-4 py-3 flex items-center space-x-3 rounded-lg transition-colors ${
                        locale === Locales.ENGLISH 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">EN</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{content.language.english}</span>
                      {locale === Locales.ENGLISH && (
                        <svg className="w-4 h-4 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => handleLanguageChange(Locales.JAPANESE)}
                      className={`w-full px-4 py-3 flex items-center space-x-3 rounded-lg transition-colors ${
                        locale === Locales.JAPANESE 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white text-xs font-bold">日</div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{content.language.japanese}</span>
                      {locale === Locales.JAPANESE && (
                        <svg className="w-4 h-4 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header 