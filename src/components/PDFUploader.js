import React, { useState } from 'react';
import { extractTextFromPDF } from '../services/pdfParser';
import { extractSubjectMarksFromText } from '../services/geminiforsgpa';
import { getGradePointFromMarks } from '../services/calculator';
import './PDFUploader.css';
import { Upload, FileText, AlertTriangle, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

const PDFUploader = ({ subjects, setSubjects, semester, onAutoFillSuccess }) => {
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [unmatchedSubjects, setUnmatchedSubjects] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const wildcardRegex = (templateCode) => {
    const cleaned = templateCode.toLowerCase().replace(/[^a-z0-9x]/gi, '');
    const pattern = cleaned.replace(/x+/gi, '[a-z0-9]*');
    return new RegExp(`^${pattern}$`, 'i');
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') return;

    setLoading(true);
    setWarning('');
    setApiError(false);
    setSuccessMessage(false);
    setUnmatchedSubjects([]);
    setUploadedFileName(file.name)

    try {
      const text = await extractTextFromPDF(file);
      const { semester: detectedSemester, subjects: extractedData } =
        await extractSubjectMarksFromText(text);

      if (!extractedData || extractedData.length === 0) {
        setApiError(true);
        return;
      }

      const selectedSemesterNum = parseInt(semester);
      const semesterLower = (semester || '').toLowerCase();
      const isFirstOrSecondSem = detectedSemester === 1 || detectedSemester === 2;
      const isCycle = semesterLower.includes('p-cycle') || semesterLower.includes('c-cycle');
      const ignoreMismatch = isFirstOrSecondSem && isCycle;

      const semesterMismatch = detectedSemester !== null &&
        selectedSemesterNum !== detectedSemester &&
        !ignoreMismatch;

      if (semester && semesterMismatch) {
        setWarning(`⚠️ Uploaded PDF is for Semester ${detectedSemester}, but you selected ${semester} Semester.`);
      }else if(!semester){
        setWarning(`⚠️ First Choose Your Scheme,Semester,Branch.`);
      }

      const updatedSubjects = subjects.map((s) => ({ ...s }));
      const unmatched = [];

      for (const { code, marks } of extractedData) {
        const cleanedCode = code?.toLowerCase().replace(/[^a-z0-9]/gi, '');
        if (!cleanedCode) continue;

        let matchFound = false;

        for (let i = 0; i < updatedSubjects.length; i++) {
          const rawCode = updatedSubjects[i].code || '';
          const possibleCodes = rawCode
            .toLowerCase()
            .split(/\/|or|\|/i)
            .map((part) => part.trim())
            .filter((c) => c.length > 0);

          for (const possible of possibleCodes) {
            const regex = wildcardRegex(possible);
            if (regex.test(cleanedCode)) {
              updatedSubjects[i].marks = marks;
              updatedSubjects[i].gradePoint = getGradePointFromMarks(marks);
              console.log(`✅ Match: ${code} → ${possible} → ${rawCode}, Marks: ${marks}`);
              matchFound = true;
              break;
            }
          }

          if (matchFound) break;
        }

        if (!matchFound) {
          console.log(`❌ No match for: ${code}`);
          unmatched.push({ code, marks });
        }
        const allFilled = updatedSubjects.every((s) => s.marks !== '' && s.marks !== undefined);
          if (allFilled && unmatched.length === 0 && !semesterMismatch) {
            setSuccessMessage(true);
          }
      }

      setSubjects(updatedSubjects);
      const allFilled = updatedSubjects.every(
        (s) => s.marks !== '' && s.marks !== undefined && s.gradePoint !== ''
      );
      if (!semesterMismatch) {
        setUnmatchedSubjects(unmatched);
      }
      if (!semesterMismatch && unmatched.length === 0 && allFilled) {
        setSuccessMessage(true);
        if (onAutoFillSuccess) onAutoFillSuccess();
      }
    } catch (error) {
      console.error('❌ Error during autofill:', error);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };  
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const event = { target: { files } };
      handleFileUpload(event);
    }
  };

  return (
    <div className="pdf-uploader-container">
      {/* Upload Section */}
      <div className="upload-card">
        <div className="upload-header">
          <div className="header-content">
            <div className="header-icon">
              <FileText size={24} />
            </div>
            <div className="header-text">
              <h3>Upload VTU Result PDF</h3>
              <p>Automatically fills your subject marks and get your SGPA in seconds</p>
            </div>
          </div>
        </div>

        <div className="upload-body">
          <div
            className={`upload-zone ${
              dragOver ? 'drag-over' : loading ? 'loading' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              disabled={loading}
              className="file-input"
            />
            
            <div className="upload-content">
              {loading ? (
                <div className="loading-state">
                  <Loader2 size={48} className="loading-spinner" />
                  <p className="loading-text">Processing your PDF...</p>
                  <p className="loading-subtext">This may take a few moments</p>
                </div>
              ) : (
                <div className="upload-state">
                  <div className="upload-icon">
                    <Upload size={32} />
                  </div>
                  <p className="upload-text">
                    Drop your PDF here or click to browse
                  </p>
                  <p className="upload-subtext">
                    Support for PDF files only
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded File Info */}
      {uploadedFileName && (
        <div className="uploaded-file-info">
          <div className="file-info-content">
            <div className="file-icon">
              <FileText size={20} />
            </div>
            <div className="file-details">
              <span className="file-name">{uploadedFileName}</span>
              <span className="file-status">
                {loading ? 'Processing...' : 'Uploaded successfully'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Messages Section */}
      <div className="messages-container">
        {/* Success Message */}
        {successMessage && (
          <div className="message success-message">
            <div className="message-icon">
              <CheckCircle size={24} />
            </div>
            <div className="message-content">
              <h4>Success!</h4>
              <p>All subject marks were filled successfully!</p>
            </div>
          </div>
        )}

        {/* Warning Message */}
        {warning && (
          <div className="message warning-message">
            <div className="message-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="message-content">
              <h4>Warning</h4>
              <p>{warning}</p>
            </div>
          </div>
        )}

        {/* API Error */}
        {apiError && (
          <div className="message error-message">
            <div className="message-icon">
              <XCircle size={24} />
            </div>
            <div className="message-content">
              <h4>Processing Failed</h4>
              <p>Failed to extract data from the PDF. Please try again later.</p>
            </div>
          </div>
        )}

        {/* Unmatched Subjects */}
        {unmatchedSubjects.length > 0 && (
          <div className="message partial-message">
            <div className="message-header">
              <div className="message-icon">
                <AlertCircle size={24} />
              </div>
              <div className="message-content">
                <h4>Partial Match</h4>
                <p>Some subjects couldn't be automatically filled:</p>
              </div>
            </div>
            
            <div className="unmatched-subjects">
              <div className="subjects-list">
                {unmatchedSubjects.map((subject, index) => (
                  <div key={index} className="subject-item">
                    <span className="subject-code">{subject.code}</span>
                    <span className="subject-marks">
                      Marks: {subject.marks}
                    </span>
                  </div>
                ))}
              </div>
              <p className="help-text">
                Please enter these subjects manually in the form above.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFUploader;
