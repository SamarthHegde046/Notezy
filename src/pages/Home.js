import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { BookOpen, Download, Search, Sparkles, Upload } from 'lucide-react';
import './Home.css';
import OptionsDropdown from '../components/OptionsDropdown';
import MarqueeBanner from '../components/MarqueeBanner';
import VTULinks from '../components/VTULinks';

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSelect = (value) => {
    navigate(`/${value}`);
  };

  const handleNotezybotClick = () => {
    navigate('/notezybot');
  };

  const handleUploadNotesClick = () => {
    window.open('https://forms.gle/nd7wsDjrxv8fyh11A', '_blank');
  };

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Comprehensive Notes",
      description: "Complete study materials for all VTU subjects",
      clickable: false
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Question Papers",
      description: "Previous year papers with solutions",
      clickable: false
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Easy Search",
      description: "Find exactly what you need in seconds",
      clickable: false
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "About Notezy",
      description: "AI-powered PDF analyzer and smart study companion",
      clickable: true,
      action: () => navigate('/notezybot')
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Upload Notes",
      description: "Contribute and share your study materials with fellow students",
      clickable: true,
      action: () => window.open('https://forms.gle/nd7wsDjrxv8fyh11A', '_blank')
    }
  ];
  const pageTitle = "Notezy | VTU Notes, Question Papers & Study Materials";
  const pageDescription =
    "Access all VTU notes, previous year question papers, and CBCS 2022 study materials in one place. Quick search, AI-powered PDF analyzer & free downloads for students.";
  const canonicalUrl = "https://notezy.online/";
  return (
    <main className={`homepage ${isVisible ? 'fade-in' : ''}`}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="VTU notes, VTU question papers, CBCS 2022 scheme, VTU study materials, VTU syllabus, Notezy AI, free VTU resources, engineering notes, CSE, AIML, ECE, ISE"
        />
        <meta name="author" content="Notezy" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content={`${window.location.origin}/feather-pen.png`}
        />
        <meta property="og:site_name" content="Notezy" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content={`${window.location.origin}/feather-pen.png`}
        />
      </Helmet>

      <MarqueeBanner />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            All VTU Notes & QP's
            <span className="title-accent">📚</span>
          </h1>
          <p className="subtitle">
            Your one-stop destination for VTU study materials, question papers, and academic resources
          </p>
        </div>
      </section>

      {/* Selection Area */}
      <section className="selection-section">
        <a href="/notezybot" className="glow-button">PDF Analyzer Bot-Notezy AI</a><br /><br />
        <a href="/quicknotes" className="glow-button">Quick Notes</a><br /><br />
        <a href="/blogs" className="glow-button">Read Our Blogs</a>
        <OptionsDropdown onSelect={handleSelect} />
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-subtitle">Why Choose Us?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <article
              key={index}
              className={`feature-card ${feature.clickable ? 'clickable' : ''}`}
              onClick={feature.clickable ? feature.action : undefined}
              style={feature.clickable ? { cursor: 'pointer' } : {}}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to ace your exams?</h2>
          <p>Join thousands of students who trust us for their VTU preparation</p>
          <button className="cta-button" onClick={() => navigate('/browse-all')}>
            Browse All Resources
          </button>
        </div>
        <VTULinks />
      </section>

      {/* Bottom Features */}
      <section className="bottom-notezy-features">
        <div className="bottom-features-container">
          <h2 className="bottom-features-title">Enhance Your Study Experience</h2>
          <div className="bottom-features-grid">
            <article className="bottom-feature-card" onClick={handleNotezybotClick}>
              <div className="bottom-feature-icon">
                <Sparkles className="sparkles-icon" />
              </div>
              <div className="bottom-feature-content">
                <h3 className="bottom-feature-title">Notezy AI Assistant</h3>
                <p className="bottom-feature-description">
                  Upload your PDFs and get instant answers, summaries, and explanations with our AI-powered study companion.
                </p>
                <span className="bottom-feature-cta">Try Notezy AI →</span>
              </div>
            </article>

            <article className="bottom-feature-card" onClick={handleUploadNotesClick}>
              <div className="bottom-feature-icon">
                <Upload className="upload-icon" />
              </div>
              <div className="bottom-feature-content">
                <h3 className="bottom-feature-title">Contribute Notes</h3>
                <p className="bottom-feature-description">
                  Help your fellow students by sharing your study materials. Upload notes, assignments, and resources.
                </p>
                <span className="bottom-feature-cta">Upload Now →</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
