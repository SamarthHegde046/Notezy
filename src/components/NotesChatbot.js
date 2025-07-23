import React, { useState, useRef, useEffect } from 'react';
import './NotesChatbot.css';
import NoteCard from './NoteCard';
import { getAllNotes } from '../services/api';
import logo from './feather-pen.png';
import {  
  Send, 
  Mic, 
  MicOff, 
  User, 
  Bot, 
  FileText, 
  Sparkles,
  VolumeX
} from 'lucide-react';

const NotesChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const chatWindowRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', type: 'text', text: input }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/gemini-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.response) {
        setMessages(prev => [...prev, { sender: 'bot', type: 'text', text: data.response }]);
        return;
      }

      if (data.error || (!data.subject && !data.code)) {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', type: 'text', text: 'Sorry, I couldn\'t understand your request clearly.' }
        ]);
        return;
      }

      const { subject, code, module, type, title } = data;
      const allNotes = await getAllNotes();

      let filtered = allNotes.filter(note =>
        (subject && note.subject.toLowerCase().includes(subject.toLowerCase())) ||
        (code && note.subject.toLowerCase().includes(code.toLowerCase()))
      );

      if (title) {
        filtered = filtered.filter(note =>
          note.title.toLowerCase() === title.toLowerCase()
        );
      }

      if (type === 'module' && module && !title) {
        filtered = filtered.filter(note =>
          note.title.toLowerCase().includes(`module ${module}`)
        );
      }

      if (type === 'qp') {
        filtered = filtered.filter(note =>
          !note.title.toLowerCase().startsWith('module')
        );
      }

      if (filtered.length > 0) {
        const criteria = [subject || code, title || (type === 'module' && module && `Module ${module}`)]
          .filter(Boolean)
          .join(', ');

        setMessages(prev => [
          ...prev,
          { sender: 'bot', type: 'text', text: `Found ${filtered.length} note(s) for ${criteria}.` },
          { sender: 'bot', type: 'notes', notes: filtered }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', type: 'text', text: ` No notes found matching your request.Try with full subject name or just subject code.` }
        ]);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', type: 'text', text: 'Oops! Something went wrong on the server.' },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="chatbot-container">
      {/* Header */}
      <div className="chatbot-header">
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="header-logo" />
          </div>
          <div className="header-text">
            <h1 className="header-title">Notes Chatbot</h1>
            <p className="header-subtitle">Ask for notes using text or voice</p>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window" ref={chatWindowRef}>
        {messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Bot className="empty-bot-icon" />
              <div className="empty-state-pulse"></div>
            </div>
            <h3 className="empty-state-title">Welcome to Notes Assistant!</h3>
            <p className="empty-state-text">
              I can help you find your notes quickly. Try asking for:
            </p>
            <div className="example-queries">
              <div className="example-query">
                <FileText className="example-icon" />
                "DBMS Module 1"
              </div>
              <div className="example-query">
                <FileText className="example-icon" />
                "BCS403 notes"
              </div>
              <div className="example-query">
                <FileText className="example-icon" />
                "Question papers"
              </div>
            </div>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.type === 'text') {
            return (
              <div
                key={i}
                className={`message-container ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="message-avatar bot-avatar">
                    <Bot className="avatar-icon" />
                    <div className="avatar-pulse"></div>
                  </div>
                )}
                <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  <p className="message-text">{msg.text}</p>
                  <div className="message-timestamp">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="message-avatar user-avatar">
                    <User className="avatar-icon" />
                    <div className="avatar-glow"></div>
                  </div>
                )}
              </div>
            );
          } else if (msg.type === 'notes') {
            return (
              <div key={i} className="notes-group1">
                <div className="notes-header1">
                  <FileText className="notes-header-icon1" />
                  <span className="notes-count1">{msg.notes.length} notes found</span>
                </div>
                <div className="notes-grid1">
                  {msg.notes.map(note => (
                    <NoteCard key={note._id} note={note} />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}

        {isLoading && (
          <div className="message-container bot-message">
            <div className="message-avatar bot-avatar loading">
              <Bot className="avatar-icon" />
              <div className="avatar-pulse loading-pulse"></div>
            </div>
            <div className="message-bubble bot-bubble loading-bubble">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
              <span className="typing-text">
                <Sparkles className="thinking-icon" />
                Searching through notes...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="chat-input1">
        <div className="input-container1">
          <div className="input-wrapper1">
            <div className="input-field-container1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask for notes....."
                disabled={isLoading}
                className="input-field1"
                rows="1"
              />
              {isListening && (
                <div className="listening-indicator">
                  <div className="listening-animation">
                    <div className="listening-wave"></div>
                    <div className="listening-wave"></div>
                    <div className="listening-wave"></div>
                  </div>
                  <span className="listening-text">
                    <Mic className="listening-icon" />
                    Listening...
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="input-buttons1">
            {speechSupported && (
              <button
                onClick={toggleListening}
                disabled={isLoading}
                className={`voice-button ${isListening ? 'listening' : ''}`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <div className="button-background"></div>
                {isListening ? (
                  <MicOff className="button-icon" />
                ) : (
                  <Mic className="button-icon" />
                )}
                {isListening && <div className="button-pulse"></div>}
              </button>
            )}
            
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="send-button1"
              title="Send message1"
            >
              <div className="button-background"></div>
              <Send className="button-icon" />
              <div className="button-shine"></div>
            </button>
          </div>
        </div>
        
        {!speechSupported && (
          <p className="voice-not-supported">
            <VolumeX className="not-supported-icon" />
            Voice recognition not supported in this browser
          </p>
        )}
      </div>
    </section>
  );
};

export default NotesChatbot;