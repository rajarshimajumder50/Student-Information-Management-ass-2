import React from 'react';
import { Heart, Code2, ShieldCheck } from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * Displays institutional copyright, assignment credits, and architecture notes.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="portal-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-brand-title">
            <span>EduTrack Portal</span> • Student Information Management
          </div>
          <p className="footer-subtitle">
            Assignment 2: Component Architecture & Unidirectional Props Data Flow
          </p>
          <p className="footer-copy">
            &copy; {currentYear} Academic Division. All rights reserved.
          </p>
        </div>

        <div className="footer-center">
          <div className="props-flow-badge">
            <span className="flow-step">App State</span>
            <span className="flow-arrow">&rarr;</span>
            <span className="flow-step">StudentList (Props)</span>
            <span className="flow-arrow">&rarr;</span>
            <span className="flow-step highlight">StudentCard (Props)</span>
          </div>
        </div>

        <div className="footer-right">
          <div className="tech-stack-pills">
            <span className="tech-pill">
              <Code2 size={12} /> React 18
            </span>
            <span className="tech-pill">Vite</span>
            <span className="tech-pill">Strict Props</span>
            <span className="tech-pill">Responsive CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
