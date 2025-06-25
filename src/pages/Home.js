import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookOpen, Download, Search, Sparkles, Upload } from 'lucide-react';
import './Home.css';
import OptionsDropdown from '../components/OptionsDropdown';
import MarqueeBanner from '../components/MarqueeBanner';

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
  }

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

  return (
    <div className={`homepage ${isVisible ? 'fade-in' : ''}`}>
      <MarqueeBanner />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            All VTU Notes & QP's
            <span className="title-accent">📚</span>
          </h1>
          <p className="subtitle">
            Your one-stop destination for VTU study materials, question papers, and academic resources
          </p>
        </div>
      </div>
      
      {/* Main Selection */}
      <div className="selection-section">
        <a href="/notezybot" className="glow-button">PDF Analyzer bot(Notezy AI)</a><br></br><br></br>
        <a href="https://forms.gle/nd7wsDjrxv8fyh11A" className="glow-button">Upload Notes</a>
        <br></br>
        <h1 className="section-title">Choose Your Sem</h1>
        <OptionsDropdown onSelect={handleSelect} />
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h3 className="section-subtitle">Why Choose Us?</h3>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${feature.clickable ? 'clickable' : ''}`}
              onClick={feature.clickable ? feature.action : undefined}
              style={feature.clickable ? { cursor: 'pointer' } : {}}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h4 className="feature-title">{feature.title}</h4>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h3>Ready to ace your exams?</h3>
          <p>Join thousands of students who trust us for their VTU preparation</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/browse-all')}
          >
            Browse All Resources
          </button>
        </div>
      </div>
      <div className="bottom-notezy-features">
                <div className="bottom-features-container">
                  <h3 className="bottom-features-title">Enhance Your Study Experience</h3>
                  <div className="bottom-features-grid">
                    <div className="bottom-feature-card" onClick={handleNotezybotClick}>
                      <div className="bottom-feature-icon">
                        <Sparkles className="sparkles-icon" />
                      </div>
                      <div className="bottom-feature-content">
                        <h4 className="bottom-feature-title">Notezy AI Assistant</h4>
                        <p className="bottom-feature-description">
                          Upload your PDFs and get instant answers, summaries, and explanations with our AI-powered study companion.
                        </p>
                        <span className="bottom-feature-cta">Try Notezy AI →</span>
                      </div>
                    </div>
        
                    <div className="bottom-feature-card" onClick={handleUploadNotesClick}>
                      <div className="bottom-feature-icon">
                        <Upload className="upload-icon" />
                      </div>
                      <div className="bottom-feature-content">
                        <h4 className="bottom-feature-title">Contribute Notes</h4>
                        <p className="bottom-feature-description">
                          Help your fellow students by sharing your study materials. Upload notes, assignments, and resources.
                        </p>
                        <span className="bottom-feature-cta">Upload Now →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  );
};

export default Home;