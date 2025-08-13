import React from 'react'
import Header from './Header'
import Hero from './Hero'
import LatestPosts from './LatestPosts'
import Footer from './Footer'

const Home: React.FC = () => {
  // 使用 intlayer 钩子获取翻译内容
  // const { title } = useIntlayer('app')

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray to-white font-sf">
      <Header />
      <main>
        {/* 这里可以使用翻译内容，例如： */}
        {/* <h1>{title}</h1> */}
        <Hero />
        <LatestPosts />
      </main>
      <Footer />
    </div>
  )
}

export default Home 