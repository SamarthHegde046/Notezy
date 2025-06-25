import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DepartmentList from '../components/DepartmentList';
import { Sparkles, Upload } from 'lucide-react'; // Assuming you are using lucide-react

const SemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sem = location.pathname.split('/')[1];

  const handleNotezybotClick = () => {
    navigate('/notezybot');
  };

  const handleUploadNotesClick = () => {
    window.open('https://forms.gle/nd7wsDjrxv8fyh11A', '_blank');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>{sem} - Branches</h1>
      <DepartmentList sem={sem} />

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

export default SemPage;