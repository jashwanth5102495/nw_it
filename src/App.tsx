import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import TradingSection from './components/TradingSection';
import TechnologiesCarousel from './components/TechnologiesCarousel';

import Footer from './components/Footer';
import About from './components/About';
import Career from './components/Career';
import Contact from './components/Contact';
import Courses from './components/Courses';
import StudentRegistration from './components/StudentRegistration';
import StudentLogin from './components/StudentLogin';
import StudentPortal from './components/StudentPortal';
import CreatorPortal from './components/CreatorPortal';
import AdminPanel from './components/AdminPanel';
import ProjectTracking from './components/ProjectTracking';
import CourseLearning from './components/CourseLearning';
import CourseEnrollment from './components/CourseEnrollment';
import AssignmentPage from './components/AssignmentPage';


function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
      <div className="min-h-screen bg-black text-white font-sans relative">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <section id="home">
                <Hero />
              </section>
              <section id="services">
                <ServicesSection />
              </section>
              <section id="career">
                <TradingSection />
              </section>

              <section id="contact">
                <TechnologiesCarousel />
              </section>
              <Footer />
            </>
          } />
          <Route path="/about" element={<><Header /><About /></>} />
          <Route path="/career" element={<><Header /><Career /></>} />
          <Route path="/contact" element={<><Header /><Contact /></>} />

          <Route path="/courses" element={<><Header /><Courses /></>} />
          <Route path="/course-enrollment/:courseId" element={<CourseEnrollment />} />
          <Route path="/student-registration" element={<StudentRegistration />} />
          <Route path="/student-login" element={<><Header /><StudentLogin /></>} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/creator-portal" element={<><Header /><CreatorPortal /></>} />
          <Route path="/admin" element={<><Header /><AdminPanel /></>} />
          <Route path="/project-tracking" element={<><Header /><ProjectTracking /></>} />
          <Route path="/course-learning/:courseId/:moduleId/:lessonId" element={<CourseLearning />} />
          <Route path="/course-learning" element={<CourseLearning />} />
          <Route path="/assignment/:assignmentId" element={<AssignmentPage />} />

        </Routes>
      </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppInner />
      </Router>
    </ThemeProvider>
  );
}

export default App;