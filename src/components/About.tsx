import React from 'react'
import { motion } from 'framer-motion'
import { useIntlayer } from 'react-intlayer'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const About: React.FC = () => {
  const navigate = useNavigate()
  const content = useIntlayer('app')

  const skills = [
    { 
      name: content.about?.skills?.java?.name || 'Java', 
      level: 90, 
      color: 'from-orange-500 to-orange-600', 
      description: content.about?.skills?.java?.description || 'Spring Boot, Spring Cloud, MyBatis' 
    },
    { 
      name: content.about?.skills?.python?.name || 'Python', 
      level: 85, 
      color: 'from-blue-500 to-blue-600', 
      description: content.about?.skills?.python?.description || 'Django, Flask, Data Analysis, Web Scraping' 
    },
    { 
      name: content.about?.skills?.react?.name || 'React', 
      level: 80, 
      color: 'from-cyan-500 to-cyan-600', 
      description: content.about?.skills?.react?.description || 'Hooks, Redux, TypeScript' 
    },
    { 
      name: content.about?.skills?.vue?.name || 'Vue.js', 
      level: 75, 
      color: 'from-green-500 to-green-600', 
      description: content.about?.skills?.vue?.description || 'Vue3, Composition API, Pinia' 
    },
    { 
      name: content.about?.skills?.wechat?.name || 'WeChat Mini Program', 
      level: 85, 
      color: 'from-green-400 to-green-500', 
      description: content.about?.skills?.wechat?.description || 'Native Development, Cloud Development, Componentization' 
    },
    { 
      name: content.about?.skills?.vite?.name || 'Vite', 
      level: 80, 
      color: 'from-purple-500 to-purple-600', 
      description: content.about?.skills?.vite?.description || 'Build Tool, Plugin Development, Performance Optimization' 
    }
  ]

  const interests = [
    {
      icon: '🚀',
      key: 'fullStack',
      title: content.about?.interests?.fullStack?.title || 'Full-Stack Development',
      description: content.about?.interests?.fullStack?.description || 'Passionate about the complete development process from frontend to backend, enjoying the process of transforming ideas into products'
    },
    {
      icon: '📱',
      key: 'mobileDev',
      title: content.about?.interests?.mobileDev?.title || 'Mobile Development',
      description: content.about?.interests?.mobileDev?.description || 'Passionate about WeChat Mini Program development, enjoying exploring new mobile technologies and user experiences'
    },
    {
      icon: '⚡',
      key: 'performance',
      title: content.about?.interests?.performance?.title || 'Performance Optimization',
      description: content.about?.interests?.performance?.description || 'Pursuing code quality and application performance, enjoying researching various optimization techniques and best practices'
    },
    {
      icon: '🌐',
      key: 'openSource',
      title: content.about?.interests?.openSource?.title || 'Open Source Contribution',
      description: content.about?.interests?.openSource?.description || 'Actively participating in the open source community, sharing technical insights, and learning from global developers'
    },
    {
      icon: '📚',
      key: 'learning',
      title: content.about?.interests?.learning?.title || 'Continuous Learning',
      description: content.about?.interests?.learning?.description || 'Maintaining sensitivity to new technologies, continuously improving technical capabilities through practical projects'
    },
    {
      icon: '💡',
      key: 'innovation',
      title: content.about?.interests?.innovation?.title || 'Innovative Thinking',
      description: content.about?.interests?.innovation?.description || 'Enjoying thinking about technical solutions, trying to combine different technology stacks to create new possibilities'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <motion.section 
          className="relative overflow-hidden bg-gradient-to-br from-apple-blue to-blue-600 text-white py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {content.about?.title || 'About Me'}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {content.about?.subtitle || 'Senior student, passionate about technology, pursuing innovation, committed to creating excellent user experiences'}
            </motion.p>
          </div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Personal Info */}
          <motion.section 
            className="mb-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {content.about?.personalInfo?.title || 'Personal Introduction'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {content.about?.personalInfo?.description || 'I am a senior student about to graduate, passionate and curious about software development. Since my freshman year, I have been learning programming through self-study and practical projects, continuously improving my technical skills.'}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {content.about?.personalInfo?.description2 || 'I particularly enjoy full-stack development and love the complete development process from frontend to backend. In WeChat Mini Program development, I have rich practical experience and have independently developed multiple fully functional mini program projects.'}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {content.about?.personalInfo?.description3 || 'I believe technology changes the world, and I also believe in the power of continuous learning. On my technical journey, I always maintain an open and humble attitude, willing to try new technologies and happy to share my learning experiences.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">
                    {content.about?.skills?.java?.name || 'Java'}
                  </span>
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    {content.about?.skills?.python?.name || 'Python'}
                  </span>
                  <span className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 rounded-full text-sm font-medium">
                    {content.about?.skills?.react?.name || 'React'}
                  </span>
                  <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    {content.about?.skills?.wechat?.name || 'WeChat Mini Program'}
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="w-80 h-80 mx-auto">
                  <img 
                    src="/avatar.jpg" 
                    alt={content.profile?.avatar || 'Profile Avatar'} 
                    className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section 
            className="mb-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {content.about?.skills?.title || 'Technical Skills'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {content.about?.skills?.description || 'Through continuous learning and project practice, I have accumulated rich experience in the following technical fields'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {skill.description}
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className={`h-3 bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Interests */}
          <motion.section 
            className="mb-20"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {content.about?.interests?.title || 'Technical Interests and Pursuits'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {content.about?.interests?.description || 'Beyond technology itself, I focus more on how to use technology to solve practical problems and create value'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interests.map((interest, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <div className="text-4xl mb-4">{interest.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {interest.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section 
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-apple-blue to-blue-600 rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                {content.about?.cta?.title || 'Looking Forward to Connecting with You'}
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {content.about?.cta?.description || 'If you are interested in my technical abilities, or want to discuss project collaboration and technical exchange, feel free to contact me anytime. I am happy to share my learning experiences and also look forward to learning more from you.'}
              </p>
              <motion.button
                className="bg-white text-apple-blue px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate('/contact')
                  // 确保跳转后滚动到页面顶部
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }, 100)
                }}
              >
                {content.about?.cta?.button || 'Contact Me'}
              </motion.button>
            </div>
          </motion.section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default About
