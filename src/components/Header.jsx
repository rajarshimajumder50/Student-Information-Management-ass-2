import React from 'react';
import { GraduationCap, Award, BookOpen, Sparkles } from 'lucide-react';
import './Header.css';

/**
 * Header Component
 * Renders the top branding bar, portal title, navigation tabs, and system status badge.
 * Props:
 * - title: string (Main title of the portal)
 * - subtitle: string (Contextual descriptor)
 * - totalCount: number (Total students currently tracked)
 */
const Header = ({ title = "EduTrack Portal", subtitle = "Student Information Management System", totalCount = 0 }) => {
  return (
    <header className="portal-header">
      <div className="header-container">
        {/* Brand identity */}
        <div className="brand-group">
          <div className="brand-logo-wrapper">
            <GraduationCap className="brand-icon" size={28} />
            <div className="brand-pulse-ring"></div>
          </div>
          <div className="brand-text">
            <div className="brand-badge">
              <Sparkles size={12} className="sparkle-icon" />
              <span>Assignment 2 • Props Architecture</span>
            </div>
            <h1 className="portal-title">{title}</h1>
            <p className="portal-subtitle">{subtitle}</p>
          </div>
        </div>

        {/* Header Right Details */}
        <div className="header-meta">
          <div className="meta-chip">
            <span className="meta-dot"></span>
            <span className="meta-text">Active Session: <strong>2025–2026</strong></span>
          </div>
          <div className="meta-chip highlight">
            <BookOpen size={14} />
            <span>Enrolled: <strong>{totalCount} Students</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
