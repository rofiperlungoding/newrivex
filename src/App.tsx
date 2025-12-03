import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

// Eagerly load core pages (shown immediately)
import Home from './pages/Home';

// Lazy load all other pages
const About = lazy(() => import('./pages/About'));
const News = lazy(() => import('./pages/News'));
const Projects = lazy(() => import('./pages/Projects'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Work = lazy(() => import('./pages/Work'));
const Extras = lazy(() => import('./pages/Extras'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const MobileApps = lazy(() => import('./pages/services/MobileApps'));
const UiUxDesign = lazy(() => import('./pages/services/UiUxDesign'));
const Blog = lazy(() => import('./pages/resources/Blog'));
const Careers = lazy(() => import('./pages/resources/Careers'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const TodoApp = lazy(() => import('./pages/extras/TodoApp'));
const WeatherApp = lazy(() => import('./pages/extras/WeatherApp'));
const ProtectedRoute = lazy(() => import('./components/auth/ProtectedRoute'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans text-primary selection:bg-accent/30 selection:text-white">
        <Navbar />

        <main>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mint"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />

              {/* New Routes */}
              <Route path="/work" element={<Work />} />
              <Route path="/extras" element={<Extras />} />
              <Route
                path="/extras/todo"
                element={
                  <ProtectedRoute>
                    <TodoApp />
                  </ProtectedRoute>
                }
              />
              <Route path="/extras/weather" element={<WeatherApp />} />
              <Route path="/work/:id" element={<ProjectDetail />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/mobile-apps" element={<MobileApps />} />
              <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
