import React, { useState,useEffect, useRef} from 'react';
import {Header,SchemeSelector,SemesterSelector,ResultDisplay,GradeTable,StreamSelector} from '../components/Vtucalculator';
import SubjectInputForm from '../components/SubjectInputForm';
import { calculateSGPA } from '../services/calculator';
import { calculateCGPA } from '../services/calculator';
import { sgpaToPercentage } from '../services/calculator';
import './main.css';
import PDFUploader from '../components/PDFUploader';

const CSE_4TH_SEM_SUBJECTS = [
  { name: 'Analyze and Design of Algorithm', credits: 3, code: 'BCS401' },
  { name: 'Microcontrollers / Artificial Intelligence', credits: 4, code: 'BCS402 / BAD402' },
  { name: 'Database Management System', credits: 4, code: 'BCS403' },
  { name: 'Analyze and Design of Algorithm Lab', credits: 1, code: 'BCSL404' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BCS40x' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course', credits: 1, code: 'BCS456X / BDSL456C' },
  { name: 'Biology for Engineers', credits: 2, code: 'BBOK407 / BBOC407' },
  { name: 'Universal Human Values Course', credits: 1, code: 'BUHK408' },
  { name: 'NSS / Sports / Yoga', credits: 0, code: 'BNSK459/BPEK459/BYOK459' },
];

const ECE_4TH_SEM_SUBJECTS = [
  { name: 'Engineering Electromagnetics', credits: 3, code: 'BEC401' },
  { name: 'Basic Signal Processing', credits: 4, code: 'BEC402' },
  { name: 'Principles of Communication Systems', credits: 4, code: 'BEC403' },
  { name: 'Communication Laboratory', credits: 1, code: 'BECL404' },
  { name: 'ESC/ETC/PLC', credits: 3, code: 'BCS40x' },
  { name: 'Ability Enhancement Course/Skill Enhancement Course', credits: 1, code: 'BXX456X' },
  { name: 'Biology for Engineers', credits: 3, code: 'BBOK407' },
  { name: 'Universal Human Values Course', credits: 1, code: 'BUHK408' },
  { name: 'NSS / Sports / Yoga', credits: 0, code: 'BNSK459/BPEK459/BYOK459' },
];


const isCSE4thSem = (semester, stream) => {
  if (semester !== '4th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase();
  return (
    s.includes('cse') ||
    s.includes('ise') ||
    s.includes('aiml')
  );
};

const isECE4thSem = (semester, stream) => {
  if (semester !== '4th') return false;
  if (!stream) return false;
  const s = stream.toLowerCase();
  // Match EC, ECE, Electronics, etc.
  return (
    s === 'ec' ||
    s === 'ece' ||
    s.includes('electronics') ||
    s.includes('ec branch') ||
    s.includes('ece branch')
  );
};


function MainCalculator() {
  const [scheme, setScheme] = useState('2022');
  const [semester, setSemester] = useState('');
  const [stream, setStream] = useState('');
  const [mode, setMode] = useState('sgpa'); // 'sgpa' or 'cgpa'
  const [transitioning, setTransitioning] = useState(false);
  const [subjects, setSubjects] = useState([
    { credits: '', marks: '', grade: '', gradePoint: '' },
  ]);
  const [semesters, setSemesters] = useState([
    { sgpa: '', credits: '' },
  ]);
  const [sgpa, setSGPA] = useState(0);
  const [cgpa, setCGPA] = useState(0);
  const [percentage, setPercentage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [autoTrigger, setAutoTrigger] = useState(false);
  const resultRef = useRef(null);
  const semesterRef = useRef(null);
  const streamRef = useRef(null);
  const autopdfRef=useRef(null);
  const firstMarksInputRef = useRef(null);

  const scrollToResult = () => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCalculate = () => {
    if (mode === 'sgpa') {
      if (isCSE4thSem(semester, stream)) {
        // Use fixed credits for CSE/ISE/AIML 4th sem
        const validSubjects = subjects.filter(
          s => s.marks !== '' && s.gradePoint !== '' && s.gradePoint !== undefined
        ).map((s, i) => ({
          credits: CSE_4TH_SEM_SUBJECTS[i].credits,
          gradePoint: Number(s.gradePoint)
        }));
        const sgpaValue = calculateSGPA(validSubjects);
        setSGPA(sgpaValue);
        setPercentage(sgpaToPercentage(sgpaValue));
        setShowResult(true);
        setTimeout(scrollToResult, 100); // scroll after result is shown
      } else if (isECE4thSem(semester, stream)) {
        const validSubjects = subjects.filter(
          s => s.marks !== '' && s.gradePoint !== '' && s.gradePoint !== undefined
        ).map((s, i) => ({
          credits: ECE_4TH_SEM_SUBJECTS[i].credits,
          gradePoint: Number(s.gradePoint)
        }));
        const sgpaValue = calculateSGPA(validSubjects);
        setSGPA(sgpaValue);
        setPercentage(sgpaToPercentage(sgpaValue));
        setShowResult(true);
        setTimeout(scrollToResult, 100);
      } else {
        // Only include subjects with valid credits and gradePoint
        const validSubjects = subjects.filter(
          s => s.credits && (s.gradePoint !== '' && s.gradePoint !== undefined)
        ).map(s => ({ ...s, credits: Number(s.credits), gradePoint: Number(s.gradePoint) }));
        const sgpaValue = calculateSGPA(validSubjects);
        setSGPA(sgpaValue);
        setPercentage(sgpaToPercentage(sgpaValue));
        setShowResult(true);
        setTimeout(scrollToResult, 100);
      }
    } else {
      // Only include semesters with valid sgpa
      const validSemesters = semesters.filter(
        s => s.sgpa
      ).map(s => ({ sgpa: Number(s.sgpa), credits: 1 })); // Use credits: 1 for all
      const cgpaValue = calculateCGPA(validSemesters);
      setCGPA(cgpaValue);
      setPercentage(sgpaToPercentage(cgpaValue));
      setShowResult(true);
      setTimeout(scrollToResult, 100);
    }
  };

  console.log("Rendered subjects:", subjects)

  const handleReset = () => {
    setScheme('2022');
    setSemester('');
    setStream('');
    setSubjects([{ credits: '', marks: '', grade: '', gradePoint: '' }]);
    setSemesters([{ sgpa: '', credits: '' }]);
    setSGPA(0);
    setCGPA(0);
    setPercentage('');
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModeChange = (newMode) => {
    if (mode !== newMode) {
      setTransitioning(true);
      setTimeout(() => {
        setMode(newMode);
        setTransitioning(false);
      }, 400); // 400ms for transition
    }
  };

  const handleSchemeChange = (newScheme) => {
    setScheme(newScheme);
    setTimeout(() => {
      if (semesterRef.current) {
        semesterRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };
  const handleSemesterChange = (newSemester) => {
    setSemester(newSemester);
    setTimeout(() => {
      if (streamRef.current) {
        streamRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleStreamChange = (newStream) => {
    setStream(newStream);
    setTimeout(() => {
      if (autopdfRef.current) {
        autopdfRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };
  useEffect(() => {
  if (autoTrigger) {
    const allFilled = subjects.every(
      (s) => s.marks !== '' && s.gradePoint !== '' && s.gradePoint !== undefined
    );
    if (allFilled) {
      handleCalculate();
    }
    setAutoTrigger(false); // reset trigger
  }
}, [subjects, autoTrigger]);

  return (
    <div className="app-container">
      <Header />
      <main>
        <div className="mode-toggle">
          <button onClick={() => handleModeChange('sgpa')} className={mode === 'sgpa' ? 'active' : ''}>SGPA</button>
          <button onClick={() => handleModeChange('cgpa')} className={mode === 'cgpa' ? 'active' : ''}>CGPA</button>
        </div>
        <div className={`mode-transition${transitioning ? ' transitioning' : ''}`}>
          <form onSubmit={e => { e.preventDefault(); handleCalculate(); }}>
            {mode === 'sgpa' && (
              <>
                <SchemeSelector scheme={scheme} setScheme={handleSchemeChange} />
                <div ref={semesterRef}>
                  <SemesterSelector semester={semester} setSemester={handleSemesterChange} />
                </div>
                <div ref={streamRef}>
                  <StreamSelector
                    semester={semester}
                    stream={stream}
                    setStream={handleStreamChange}
                  />
                </div>
              </>
            )}
            {mode === 'sgpa' ? (
              <>
              {scheme && semester && stream && (
                <div ref={autopdfRef}>
                  <PDFUploader
                    subjects={subjects}
                    setSubjects={setSubjects}
                    semester={semester}
                    onAutoFillSuccess={() => setAutoTrigger(true)}
                  />
                  <p style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    margin: '1rem 0',
                    color: '#4b5563',
                    fontWeight: '500'
                  }}>
                    — Or manually enter marks below —
                  </p>
                </div>
              )}
              <div>
                  <SubjectInputForm
                    subjects={subjects}
                    setSubjects={setSubjects}
                    mode="sgpa"
                    semester={semester}
                    stream={stream}
                    firstInputRef={firstMarksInputRef}
                  />
              </div>
              </>
            ) : (
              <SubjectInputForm subjects={semesters} setSubjects={setSemesters} mode="cgpa" />
            )}
            <div className="form-actions">
              <button type="submit" className="calculate-btn">Calculate</button>
              <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
            </div>
          </form>
          <GradeTable />
          {showResult && (
            <div ref={resultRef}>
              <ResultDisplay
                sgpa={sgpa}
                cgpa={cgpa}
                percentage={percentage}
                mode={mode}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainCalculator;