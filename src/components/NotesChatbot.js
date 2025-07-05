import React, { useState } from 'react';
import './NotesChatbot.css';
import NoteCard from './NoteCard';
import { getAllNotes } from '../services/api';
import logo from './feather-pen.png';

const NotesChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', type: 'text', text: input }]);
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/gemini-chat', {
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
          { sender: 'bot', type: 'text', text: '❌ Sorry, I couldn’t understand your request clearly.' }
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
          { sender: 'bot', type: 'text', text: `✅ Found ${filtered.length} note(s) for ${criteria}.` },
          { sender: 'bot', type: 'notes', notes: filtered }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', type: 'text', text: `❌ No notes found matching your request.` }
        ]);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', type: 'text', text: '⚠️ Oops! Something went wrong on the server.' },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="chatbot-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px' }}>
        <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
        <h2 style={{ margin: 0 }}>Notes Chatbot</h2>
      </div>

      <div className="chat-window">
        {messages.map((msg, i) => {
          if (msg.type === 'text') {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '12px',
                  alignItems: 'flex-end'
                }}
              >
                {msg.sender === 'bot' && (
                  <img 
                    src={logo}
                    alt="Bot"
                    style={{ width: 35, height: 35, borderRadius: '10%', marginRight: 8 }}
                  />
                )}
                <div
                  style={{
                    position: 'relative',
                    backgroundColor: msg.sender === 'user' ? '#d1e7dd' : '#e2e3e5',
                    padding: '10px 14px',
                    borderRadius: 12,
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      [msg.sender === 'user' ? 'right' : 'left']: -8,
                      width: 0,
                      height: 0,
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderLeft: msg.sender === 'user' ? '8px solid #d1e7dd' : 'none',
                      borderRight: msg.sender === 'bot' ? '8px solid #e2e3e5' : 'none',
                    }}
                  />
                </div>
              </div>
            );
          } else if (msg.type === 'notes') {
            return (
              <div key={i} className="notes-group">
                {msg.notes.map(note => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            );
          } else {
            return null;
          }
        })}

        {isLoading && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask for notes (e.g., I need DBMS Module 1, BCS403, question paper)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default NotesChatbot;
