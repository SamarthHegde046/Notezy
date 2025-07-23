import React from 'react';
import { gradeMapping } from '../services/calculator';
import './SelectorGroup.css';

export const Header = () => (
  <header className="app-header">
    <h1>VTU SGPA & CGPA Calculator</h1>
  </header>
);

export const GradeTable = () => (
  <table className="grade-table">
    <thead>
      <tr>
        <th>Marks Range</th>
        <th>Letter Grade</th>
        <th>Grade Point</th>
      </tr>
    </thead>
    <tbody>
      {gradeMapping.map((row, idx) => (
        <tr key={idx}>
          <td>{row.min}-{row.max}</td>
          <td>{row.letter.join('/')}</td>
          <td>{row.point}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const getDivision = (value) => {
  if (value >= 7.75) return 'First Class with Distinction';
  if (value >= 6.75) return 'First Class';
  if (value >= 5.75) return 'Second Class';
  if (value >= 4.00) return 'Pass Class';
  return 'Fail';
};

export const ResultDisplay = ({ sgpa, cgpa, percentage, mode = 'sgpa', semesters = [] }) => {
  const value = mode === 'sgpa' ? sgpa : cgpa;
  const division = getDivision(value);
  const showTable = mode === 'cgpa' && semesters && semesters.length > 0;
  const totalCredits = semesters.reduce((sum, s) => sum + Number(s.credits), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="result-display">
      <h3>Result</h3>
      {mode === 'sgpa' && (
        <p><strong>SGPA:</strong> {sgpa.toFixed(2)}</p>
      )}
      {mode === 'cgpa' && (
        <>
          <p><strong>CGPA:</strong> {cgpa.toFixed(2)}</p>
          {showTable && (
            <table className="cgpa-breakdown-table">
              <thead>
                <tr>
                  <th>Semester</th>
                  <th>SGPA</th>
                  <th>Credits</th>
                  <th>Weighted Contribution</th>
                </tr>
              </thead>
              <tbody>
                {semesters.map((s, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{Number(s.sgpa).toFixed(2)}</td>
                    <td>{s.credits}</td>
                    <td>{((Number(s.sgpa) * Number(s.credits)) / (totalCredits || 1)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button className="print-btn" onClick={handlePrint}>Print Result</button>
        </>
      )}
      <p><strong>Percentage:</strong> {percentage}%</p>
      <p><strong>Division/Class:</strong> {division}</p>
    </div>
  );
};

const schemes = ['2022'];

export const SchemeSelector = ({ scheme, setScheme }) => (
  <div className="section-card">
    <h3>Choose Scheme:</h3>
    <div className="selector-group">
      {schemes.map(s => (
        <button
          key={s}
          className={`selector-btn${scheme === s ? ' selected' : ''}`}
          onClick={() => setScheme(s)}
          type="button"
        >
          {s}
        </button>
      ))}
    </div>
    <div className="selected-label">selected scheme: <b>{scheme}</b></div>
  </div>
);

const semesters = [
  { label: 'Physics Cycle', value: 'P-cycle' },
  { label: 'Chemistry Cycle', value: 'C-cycle' },
  { label: '3rd Semester', value: '3rd' },
  { label: '4th Semester', value: '4th' },
  { label: '5th Semester', value: '5th' },
  { label: '6th Semester', value: '6th' },
  { label: '7th Semester', value: '7th' },
  { label: '8th Semester', value: '8th' },
];

export const SemesterSelector = ({ semester, setSemester }) => (
  <div className="section-card">
    <h3>Choose Semester:</h3>
    <div className="selector-group">
      {semesters.map(s => (
        <button
          key={s.value}
          className={`selector-btn${semester === s.value ? ' selected' : ''}`}
          onClick={() => setSemester(s.value)}
          type="button"
        >
          {s.label}
        </button>
      ))}
    </div>
    <div className="selected-label">selected semester: <b>{semesters.find(s => s.value === semester)?.label || ''}</b></div>
  </div>
);

const streamOptions = {
  'P-cycle': [
    'Civil Engineering Stream (CV/EV/TR/CC)',
    'CSE Stream Scheme (CSE/ISC/BT)',
    'Electrical Engg Science Streams (EEE/ECE/ETC/BM/IE/ML)',
    'Mechanical Engineering Streams (AE/AS/AU/ME/IP/IM/CH/SX/TX)',
  ],
  'C-cycle': [
    'Civil Engineering Stream (CV/EV/TR/CC)',
    'CSE Stream Scheme (CSE/ISC/BT)',
    'Electrical Engg Science Streams (EEE/ECE/ETC/BM/IE/ML)',
    'Mechanical Engineering Streams (AE/AS/AU/ME/IP/IM/CH/SX/TX)',
  ],
  'default': [
    'CSE / IS / AIML',
    'EC',
    'EEE',
    'Civil Engineering',
    'Mechanical Engineering',
  ]
};

export const StreamSelector = ({ semester, stream, setStream }) => {
  const isCycle = semester === 'P-cycle' || semester === 'C-cycle';
  const streams = isCycle ? streamOptions[semester] : streamOptions['default'];

  return (
    <div className="section-card">
      <h3>Choose Branch:</h3>
      <div className="selector-group">
        {streams.map(s => (
          <button
            key={s}
            className={`selector-btn${stream === s ? ' selected' : ''}`}
            onClick={() => setStream(s)}
            type="button"
          >
            {s}
          </button>
        ))}
      </div>
      {stream && (
        <div className="selected-label">selected branch: <b>{stream}</b></div>
      )}
    </div>
  );
};