import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import { ClientProvider } from './context/ClientContext'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Benefits from './pages/Benefits'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'

function AppContent() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/boutique" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="/bienfaits" element={<PageTransition><Benefits /></PageTransition>} />
            <Route path="/avis" element={<PageTransition><Reviews /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="/confirmation" element={<PageTransition><Confirmation /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
      <Toast />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ToastProvider>
          <ClientProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </ClientProvider>
        </ToastProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
