import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { IntlayerProvider } from 'react-intlayer'
import Home from './components/Home'
import Articles from './components/Articles'
import ArticleDetail from './components/ArticleDetail'
import Tags from './components/Tags'
import About from './components/About'
import Contact from './components/Contact'

const App: React.FC = () => (
  <IntlayerProvider>
    <Router 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  </IntlayerProvider>
)

export default App 