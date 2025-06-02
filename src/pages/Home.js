import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookOpen, Download, Search } from 'lucide-react';
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

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Comprehensive Notes",
      description: "Complete study materials for all VTU subjects"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Question Papers",
      description: "Previous year papers with solutions"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Easy Search",
      description: "Find exactly what you need in seconds"
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
        <h2 className="section-title">Choose Your Course</h2>
        <OptionsDropdown onSelect={handleSelect} />
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h3 className="section-subtitle">Why Choose Us?</h3>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
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
    </div>
  );
};

export default Home;