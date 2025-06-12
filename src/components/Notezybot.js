import { useEffect, useRef, useState } from "react";
import './Notezybot.css';
import send from './send_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png';
import logo from './feather-pen.png';
// Markdown renderer component
const MarkdownText = ({ text }) => {
  const renderText = (text) => {
    // Handle bold text **text** or ***text***
    let rendered = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong>$1</strong>');
    rendered = rendered.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text *text*
    rendered = rendered.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');
    
    // Handle line breaks
    rendered = rendered.replace(/\n/g, '<br/>');
    
    return rendered;
  };

  return (
    <div 
      className="markdown-text"
      dangerouslySetInnerHTML={{ __html: renderText(text) }}
    />
  );
};

// Header Component
const Header = ({ sessionId, onClearChat }) => (
  <div className="header">
    <div className="header-container">
      <div className="header-content">
        <div className="header-left">
          <div className="header-icon">
            <img src={logo} alt="StudyNotes Logo" className="logo-img" />
          </div>
          <div>
            <h1 className="header-title">Notezy AI</h1>
            <p className="header-subtitle">Book Extractor & Explainer</p>
          </div>
        </div>
        <div className="header-actions">
          {sessionId && (
            <button
              onClick={onClearChat}
              className="clear-button"
            >
              <span>✕</span>
              Clear Chat
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card1">
    <span className="feature-icon1">{icon}</span>
    <div>
      <span className="feature-title1">{title}</span>
      <span className="feature-description1">{description}</span>
    </div>
  </div>
);

// PDF Upload Status Component
const UploadStatus = ({ pdfFile }) => (
  <div className="upload-status">
    <div className="upload-status-content">
      <span className="upload-status-icon">📄</span>
      <div>
        <p className="upload-status-title">PDF Uploaded</p>
        <p className="upload-status-filename">{pdfFile.name}</p>
      </div>
    </div>
  </div>
);

// Suggested Questions Component
const SuggestedQuestions = ({ questions, onQuestionClick }) => (
  <div className="suggested-questions">
    <h3 className="suggested-questions-title">
      💡 Try asking me about:
    </h3>
    <div className="suggested-questions-grid">
      {questions.map((question, idx) => (
        <button
          key={idx}
          onClick={() => onQuestionClick(question)}
          className="suggested-question-button"
        >
          {question}
        </button>
      ))}
    </div>
  </div>
);

// Welcome Screen Component
const WelcomeScreen = ({ pdfFile, sessionId, onQuestionSelect }) => {
  const features = [
    { icon: "📄", title: "PDF Analysis", description: "Upload any PDF and get instant analysis of its content" },
    { icon: "🔍", title: "Content Search", description: "Find specific information quickly within your documents" },
    { icon: "🧠", title: "Smart Summarization", description: "Get key insights and summaries from complex documents" }
  ];

  const suggestedQuestions = [
    "What are the main topics covered in this document?",
    "Can you provide a summary of the key points?",
    "What are the main conclusions or recommendations?",
    "Are there any important statistics or data mentioned?",
    "What are the key takeaways I should remember?"
  ];

  return (
    <div className="welcome-screen">
      <div className="welcome-header">
        <div className="welcome-icon">
          <img src={logo} alt="StudyNotes Logo" className="logo-img" />
        </div>
        <h2 className="welcome-title">
          Welcome to Notezy AI
        </h2>
        <p className="welcome-description">
          Upload a PDF and start a smart, buzzing conversation about its contents
        </p>
      </div>

      <div className="features-grid1">
        <div className="features-container1">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {pdfFile && <UploadStatus pdfFile={pdfFile} />}

      {sessionId && (
        <SuggestedQuestions 
          questions={suggestedQuestions} 
          onQuestionClick={onQuestionSelect} 
        />
      )}
    </div>
  );
};

// Chat Message Component
const ChatMessage = ({ message, formatTime }) => (
  <div className={`chat-message ${message.type === 'user' ? 'user' : 'bot'}`}>
    <div className={`message-bubble ${message.type} ${message.isError ? 'error' : ''}`}>
      {message.type === 'user' || message.type === 'system' ? (
        <div className="message-content">{message.content}</div>
      ) : (
        <MarkdownText text={message.content} />
      )}
      <div className="message-timestamp">
        {formatTime(message.timestamp)}
      </div>
    </div>
  </div>
);

// Loading Indicator Component
const LoadingIndicator = () => (
  <div className="chat-message bot">
    <div className="message-bubble bot">
      <div className="loading-content">
        <span>Thinking... Scanning your document!</span>
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  </div>
);

// Chat Area Component
const ChatArea = ({ messages, loading, formatTime, messagesEndRef }) => (
  <div className="chat-area">
    <div className="chat-messages">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} formatTime={formatTime} />
      ))}
      
      {loading && <LoadingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  </div>
);

// Input Area Component
const InputArea = ({ 
  currentMessage, 
  setCurrentMessage, 
  sessionId, 
  loading, 
  uploading, 
  error, 
  pdfFile, 
  onSendMessage, 
  onFileUpload, 
  fileInputRef,
  inputRef,
  handleKeyDown 
}) => (
  <div className="input-area">
    <div className="input-container">
      <div className="input-row">
        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`upload-button ${uploading ? 'uploading' : ''}`}
          title="Upload PDF"
        >
          {uploading ? (
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            <span>📎</span>
          )}
        </button>

        {/* Message Input */}
        <div className="message-input-container">
          <textarea
            ref={inputRef}
            value={currentMessage}
            onChange={(e) => {
              setCurrentMessage(e.target.value);
              // Auto-resize textarea
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
            placeholder={sessionId ? "Type your questions about the PDF..." : "No file yet. Upload a PDF to begin."}
            onKeyDown={handleKeyDown}
            disabled={loading || !sessionId}
            rows={1}
            className={`message-input ${loading || !sessionId ? 'disabled' : ''}`}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={onSendMessage}
          disabled={loading || !currentMessage.trim() || !sessionId}
          className={`send-button ${(loading || !currentMessage.trim() || !sessionId) ? 'disabled' : ''}`}
          title="Send Message"
        >
          {loading ? (
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          ) : (
            <img src={send} alt="Send" />
            )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* File Status */}
      {pdfFile && (
        <div className="file-status">
          <span className="file-icon">📄</span>
          <span>File: {pdfFile.name}</span>
        </div>
      )}
    </div>
  </div>
);

// Main App Component
function Notezybot() {
  const [pdfFile, setPdfFile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current && !loading) {
      inputRef.current.focus();
    }
  }, [loading, sessionId]);

  const addMessage = (content, type, isError = false) => {
    const newMessage = {
      id: Date.now(),
      content,
      type,
      timestamp: new Date(),
      isError
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Heads up! That file isn't a valid PDF. Please upload a correct one.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("This file is too large. Please upload a PDF smaller than 20MB");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setPdfFile(file);
      setSessionId(data.sessionId);
      addMessage(`📄 ${file.name} uploaded successfully!`, "system");
      addMessage("Ready! Your PDF is uploaded. Ask your question to begin.", "bot");

    } catch (err) {
      let errorMsg = "Upload failed. Please try again.";
      setError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!sessionId) {
      setError("Feed me a PDF to start buzzing with answers!");
      return;
    }
    if (!currentMessage.trim()) {
      setError("Please type a question before sending.");
      return;
    }

    const userMessage = currentMessage.trim();
    addMessage(userMessage, "user");
    setCurrentMessage("");
    setLoading(true);
    setError("");

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          question: userMessage,
          conversationHistory: messages
        }),
      });

      if (!response.ok) {
        throw new Error("The server couldn't be reached. Please try again shortly!");
      }

      const data = await response.json();
      addMessage(data.response, "bot");

    } catch (err) {
      let errorMsg = "Hmm... I couldn't find an answer this time. Please try again.";
      addMessage(errorMsg, "bot", true);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (sessionId) {
      fetch(`${process.env.REACT_APP_API_BASE}/session/${sessionId}`, { method: 'DELETE' }).catch(() => {});
    }
    setMessages([]);
    setPdfFile(null);
    setSessionId(null);
    setCurrentMessage("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="app">
      <Header 
        sessionId={sessionId} 
        onClearChat={clearChat} 
      />

      <div className="main-container">
        {messages.length === 0 ? (
          <WelcomeScreen 
            pdfFile={pdfFile} 
            sessionId={sessionId} 
            onQuestionSelect={setCurrentMessage}
          />
        ) : (
          <>
            <ChatArea 
              messages={messages} 
              loading={loading} 
              formatTime={formatTime} 
              messagesEndRef={messagesEndRef} 
            />
            <InputArea
              currentMessage={currentMessage}
              setCurrentMessage={setCurrentMessage}
              sessionId={sessionId}
              loading={loading}
              uploading={uploading}
              error={error}
              pdfFile={pdfFile}
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileChange}
              fileInputRef={fileInputRef}
              inputRef={inputRef}
              handleKeyDown={handleKeyDown}
            />
          </>
        )}

        {messages.length === 0 && (
          <InputArea
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            sessionId={sessionId}
            loading={loading}
            uploading={uploading}
            error={error}
            pdfFile={pdfFile}
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileChange}
            fileInputRef={fileInputRef}
            inputRef={inputRef}
            handleKeyDown={handleKeyDown}
          />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={uploading}
      />
    </div>
  );
}

export default Notezybot;