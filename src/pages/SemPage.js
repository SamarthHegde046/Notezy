import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DepartmentList from '../components/DepartmentList';
import { Sparkles, Upload } from 'lucide-react';

const SemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sem = location.pathname.split('/')[1];

  const SEM_OPTIONS = [
    { label: 'Physics Cycle', value: 'Physicscycle' },
    { label: 'Chemistry Cycle', value: 'Chemistrycycle' },
    { label: 'Semester 3', value: 'Sem3' },
    { label: 'Semester 4', value: 'Sem4' },
    { label: 'Semester 5', value: 'Sem5' },
    { label: 'Semester 6', value: 'Sem6' },
  ];

  const semLabel =
    SEM_OPTIONS.find(opt => opt.value.toLowerCase() === sem.toLowerCase())?.label || sem;

  const handleNotezybotClick = () => {
    navigate('/notezybot');
  };

  const handleUploadNotesClick = () => {
    window.open('https://forms.gle/nd7wsDjrxv8fyh11A', '_blank');
  };

  return (
    <main>
      <Helmet>
        <title>{semLabel} - VTU Branches | Notezy</title>
        <meta
          name="description"
          content={`Explore available branches for ${semLabel}. Access notes, resources, and study materials at Notezy.`}
        />
      </Helmet>

      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
        {semLabel} - Branches
      </h1>

      <DepartmentList sem={sem} />

      <section className="bottom-notezy-features">
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
      </section>
    </main>
  );
};

export default SemPage;
