import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { BlogIndex } from './pages/BlogIndex'
import { BlogPost } from './pages/BlogPost'
import { DocumentsIndex } from './pages/DocumentsIndex'
import { DocumentView } from './pages/DocumentView'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/documents" element={<DocumentsIndex />} />
      <Route path="/documents/:slug" element={<DocumentView />} />
    </Routes>
  )
}
