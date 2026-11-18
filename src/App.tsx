import { Navigate, Routes, Route, useParams } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DocumentsIndex } from './pages/DocumentsIndex'
import { DocumentView } from './pages/DocumentView'

function DocumentSlugRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={slug ? `/blog/${slug}` : '/blog'} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<DocumentsIndex />} />
      <Route path="/blog/:slug" element={<DocumentView />} />
      <Route path="/documents" element={<Navigate to="/blog" replace />} />
      <Route path="/documents/:slug" element={<DocumentSlugRedirect />} />
    </Routes>
  )
}
