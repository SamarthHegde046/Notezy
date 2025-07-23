import React, { useState} from 'react';
import {SchemeSelector,SemesterSelector,ResultDisplay,GradeTable,StreamSelector} from '../components/Vtucalculator';
import SubjectInputForm from '../components/SubjectInputForm';
import { calculateSGPA } from '../services/calculator';
import { calculateCGPA } from '../services/calculator';
import { sgpaToPercentage } from '../services/calculator';
import './main.css';
import { useNavigate } from 'react-router-dom';
import MainCalculator from './MainCalculator';
import { Helmet } from 'react-helmet';

export function Homesgpaandcgpa({ onSelect }) {
  const navigate = useNavigate();
  return (
    <>
    <Helmet>
        <title>VTU SGPA & CGPA Calculator (2022 Scheme) | Notezy</title>
        <meta
          name="description"
          content="Easily calculate your VTU SGPA, CGPA, and percentage online for the 2022 CBCS scheme. Fast, accurate, and student-friendly calculator by Notezy."
        />
        <meta
          name="keywords"
          content="VTU SGPA calculator, VTU CGPA calculator, VTU percentage calculator, VTU CBCS scheme 2022, VTU grade calculator, engineering CGPA calculator"
        />
        <link rel="canonical" href="https://notezy.online/sgpa-and-cgpa-calculator-2022-scheme" />

        {/* Open Graph */}
        <meta property="og:title" content="VTU SGPA & CGPA Calculator (2022 Scheme) | Notezy" />
        <meta
          property="og:description"
          content="Quickly calculate VTU SGPA, CGPA & percentage online. Supports 2022 CBCS scheme with accurate results."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://notezy.online/sgpa-and-cgpa-calculator-2022-scheme" />
        <meta property="og:image" content={`${window.location.origin}/feather-pen.png`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VTU SGPA & CGPA Calculator - Notezy" />
        <meta
          name="twitter:description"
          content="Accurate & fast VTU SGPA, CGPA & percentage calculator for 2022 CBCS scheme."
        />
        <meta name="twitter:image" content={`${window.location.origin}/feather-pen.png`} />
      </Helmet>
    <section className="home-cards-container">
      <div className="home-card">
        <p>Here you can calculate your sgpa</p>
        <button className="home-card-btn" onClick={() => navigate('/sgpa-calculator')}>VTU SGPA Calculator</button>
      </div>
      <div className="home-card">
        <p>Here you can calculate your cgpa</p>
        <button className="home-card-btn" onClick={() => navigate('/cgpa-calculator')}>VTU CGPA Calculator</button>
      </div>
      <div className="home-card">
        <p>Here you can calculate your percentage</p>
        <button className="home-card-btn" onClick={() => navigate('/cgpa')}>VTU Percentage Calculator</button>
      </div>
      <div>
        <MainCalculator/>
      </div>
    </section>
  </>
  );
}
export function SgpaCalculator(props) {
  const [scheme, setScheme] = useState('2022');
  const [semester, setSemester] = useState('');
  const [stream, setStream] = useState('');
  const [department, setDepartment] = useState('');
  const [subjects, setSubjects] = useState([
    { credits: '', marks: '', grade: '', gradePoint: '' },
  ]);
  const [sgpa, setSGPA] = useState(0);
  const [percentage, setPercentage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleCalculate = () => {
    const validSubjects = subjects.filter(
      s => s.credits && (s.gradePoint !== '' && s.gradePoint !== undefined)
    ).map(s => ({ ...s, credits: Number(s.credits), gradePoint: Number(s.gradePoint) }));
    const sgpaValue = calculateSGPA(validSubjects);
    setSGPA(sgpaValue);
    setPercentage(sgpaToPercentage(sgpaValue));
    setShowResult(true);
  };
  const handleReset = () => {
    setScheme('2022');
    setSemester('');
    setStream('');
    setDepartment('');
    setSubjects([{ credits: '', marks: '', grade: '', gradePoint: '' }]);
    setSGPA(0);
    setPercentage('');
    setShowResult(false);
  };
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>VTU SGPA Calculator | 2022 CBCS Scheme</title>
        <meta
          name="description"
          content="Calculate your VTU SGPA instantly! Supports 2022 CBCS scheme with accurate grade calculations for all branches."
        />
        <meta
          name="keywords"
          content="VTU SGPA calculator, VTU CBCS scheme, VTU marks to SGPA, SGPA calculator 2022, engineering grade calculator"
        />
        <link rel="canonical" href="https://notezy.online/sgpa-calculator" />

        {/* Open Graph */}
        <meta property="og:title" content="VTU SGPA Calculator | CBCS 2022 Scheme" />
        <meta
          property="og:description"
          content="Fast and accurate SGPA calculator for VTU students. Supports 2022 CBCS scheme."
        />
        <meta property="og:url" content="https://notezy.online/sgpa-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${window.location.origin}/feather-pen.png`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VTU SGPA Calculator | Notezy" />
        <meta
          name="twitter:description"
          content="Quick SGPA calculator for VTU CBCS scheme 2022."
        />
        <meta name="twitter:image" content={`${window.location.origin}/feather-pen.png`} />
      </Helmet>

    <div className={`calculator-transition${transitioning ? ' transitioning' : ''} sgpa`}>
      <form onSubmit={e => { e.preventDefault(); handleCalculate(); }}>
        <SchemeSelector scheme={scheme} setScheme={setScheme} />
        <SemesterSelector semester={semester} setSemester={setSemester} />
        <StreamSelector
          semester={semester}
          stream={stream}
          setStream={setStream}
          department={department}
          setDepartment={setDepartment}
        />
        <SubjectInputForm subjects={subjects} setSubjects={setSubjects} mode="sgpa" />
        <div className="form-actions">
          <button type="submit">Calculate</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
      <GradeTable />
      {showResult && (
        <ResultDisplay
          sgpa={sgpa}
          cgpa={0}
          percentage={percentage}
          mode="sgpa"
          semesters={[]}
        />
      )}
    </div>
    </>
  );
}

export function CgpaCalculator(props) {
  const [semesters, setSemesters] = useState([
    { sgpa: '', credits: '' },
  ]);
  const [cgpa, setCGPA] = useState(0);
  const [percentage, setPercentage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleCalculate = () => {
    const validSemesters = semesters.filter(
      s => s.sgpa
    ).map(s => ({ sgpa: Number(s.sgpa), credits: Number(s.credits) }));
    const cgpaValue = calculateCGPA(validSemesters);
    setCGPA(cgpaValue);
    setPercentage(sgpaToPercentage(cgpaValue));
    setShowResult(true);
  };
  const handleReset = () => {
    setSemesters([{ sgpa: '', credits: '' }]);
    setCGPA(0);
    setPercentage('');
    setShowResult(false);
  };
  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>VTU CGPA Calculator | CBCS Scheme</title>
        <meta
          name="description"
          content="Calculate your VTU CGPA online. Supports CBCS scheme for all branches with easy percentage conversion."
        />
        <meta
          name="keywords"
          content="VTU CGPA calculator, VTU CBCS, CGPA to percentage, VTU engineering marks calculator"
        />
        <link rel="canonical" href="https://notezy.online/cgpa-calculator" />

        {/* Open Graph */}
        <meta property="og:title" content="VTU CGPA Calculator | CBCS Scheme" />
        <meta
          property="og:description"
          content="Quick and accurate CGPA calculator for VTU CBCS scheme. Convert CGPA to percentage easily."
        />
        <meta property="og:url" content="https://notezy.online/cgpa-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${window.location.origin}/feather-pen.png`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VTU CGPA Calculator | Notezy" />
        <meta
          name="twitter:description"
          content="Calculate your VTU CGPA with ease and convert to percentage instantly."
        />
        <meta name="twitter:image" content={`${window.location.origin}/feather-pen.png`} />
      </Helmet>
    <div className={`calculator-transition${transitioning ? ' transitioning' : ''} cgpa`}>
      <h1>CGPA Calculator</h1>
      <form onSubmit={e => { e.preventDefault(); handleCalculate(); }}>
        <SubjectInputForm subjects={semesters} setSubjects={setSemesters} mode="cgpa" />
        <div className="form-actions">
          <button type="submit">Calculate</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
      {showResult && (
        <ResultDisplay
          sgpa={0}
          cgpa={cgpa}
          percentage={percentage}
          mode="cgpa"
          semesters={semesters}
        />
      )}
    </div>
    </>
  );
} 
