import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button in Top-Right */}
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        {/* Title Header */}
        {title && <h3 className="modal-title"></h3>}

        {/* Content */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
