import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Work from './pages/Work';
import Extras from './pages/Extras';
import ProjectDetail from './pages/ProjectDetail';
import WebDevelopment from './pages/services/WebDevelopment';
import MobileApps from './pages/services/MobileApps';
import UiUxDesign from './pages/services/UiUxDesign';
import Blog from './pages/resources/Blog';
import Careers from './pages/resources/Careers';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TodoApp from './pages/extras/TodoApp';
import WeatherApp from './pages/extras/WeatherApp';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans text-primary selection:bg-accent/30 selection:text-white">
        <Navbar />

        <main>
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
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
