import React, { useState } from 'react';
import { Award, BookOpen, Hash, Mail, Star, Sparkles, TrendingUp } from 'lucide-react';
import './StudentCard.css';

/**
 * Helper to determine department styling and icon badge
 */
const getDepartmentBadgeInfo = (dept) => {
  const lower = dept.toLowerCase();
  if (lower.includes('computer') || lower.includes('software')) {
    return { className: 'dept-cs', label: 'CS & Engineering' };
  }
  if (lower.includes('artificial') || lower.includes('data')) {
    return { className: 'dept-ai', label: 'AI & Data Science' };
  }
  if (lower.includes('electronics') || lower.includes('communication')) {
    return { className: 'dept-ec', label: 'Electronics & Comm.' };
  }
  if (lower.includes('mechanical')) {
    return { className: 'dept-me', label: 'Mechanical Engg.' };
  }
  if (lower.includes('bio')) {
    return { className: 'dept-bt', label: 'Biotechnology' };
  }
  if (lower.includes('electrical')) {
    return { className: 'dept-ee', label: 'Electrical Engg.' };
  }
  if (lower.includes('civil')) {
    return { className: 'dept-ce', label: 'Civil Engg.' };
  }
  return { className: 'dept-default', label: dept };
};

/**
 * Helper to determine CGPA tier, highlight classes, and grade labels
 */
const getCgpaTier = (cgpa) => {
  const num = Number(cgpa);
  if (num >= 9.5) {
    return {
      tierClass: 'cgpa-elite',
      label: 'Summa Cum Laude',
      tierBadge: 'Top Tier 9.5+',
      starCount: 3
    };
  }
  if (num >= 9.0) {
    return {
      tierClass: 'cgpa-outstanding',
      label: 'Dean\'s Honors',
      tierBadge: 'Outstanding',
      starCount: 2
    };
  }
  if (num >= 8.5) {
    return {
      tierClass: 'cgpa-distinction',
      label: 'Distinction',
      tierBadge: 'High Merit',
      starCount: 1
    };
  }
  if (num >= 8.0) {
    return {
      tierClass: 'cgpa-firstclass',
      label: 'First Class',
      tierBadge: 'First Class',
      starCount: 1
    };
  }
  return {
    tierClass: 'cgpa-good',
    label: 'Good Standing',
    tierBadge: 'Standard',
    starCount: 0
  };
};

/**
 * StudentCard Component
 * Purely renders student information received strictly via props.
 * Demonstrates component reusability and clean UI presentation.
 * 
 * Props:
 * - student: Object containing:
 *   - name: string
 *   - rollNumber: string
 *   - department: string
 *   - semester: string
 *   - cgpa: number
 *   - photo: string
 *   - email: string (optional)
 *   - badge: string (optional)
 */
const StudentCard = ({ student }) => {
  const [imgError, setImgError] = useState(false);

  if (!student) {
    return null;
  }

  const {
    name,
    rollNumber,
    department,
    semester,
    cgpa,
    photo,
    email,
    badge
  } = student;

  const deptInfo = getDepartmentBadgeInfo(department);
  const cgpaTier = getCgpaTier(cgpa);
  const cgpaPercentage = Math.min(100, Math.max(0, (cgpa / 10) * 100));

  // Fallback avatar URL if Unsplash fails to load
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=6366f1&color=ffffff&bold=true&size=200`;

  return (
    <article className={`student-card ${cgpaTier.tierClass}`}>
      {/* Decorative top accent line */}
      <div className="card-accent-bar" />

      {/* Card Header: Avatar & Key Badges */}
      <div className="card-header-section">
        <div className="avatar-wrapper">
          <img
            src={imgError ? fallbackAvatar : photo}
            alt={`${name}'s portrait`}
            className="student-avatar"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="status-indicator" title="Active Enrollment" />
        </div>

        <div className="header-meta-details">
          {badge && (
            <span className="special-badge">
              <Sparkles size={11} className="badge-sparkle" />
              {badge}
            </span>
          )}
          <span className={`dept-badge ${deptInfo.className}`} title={department}>
            {deptInfo.label}
          </span>
        </div>
      </div>

      {/* Card Body: Name, Roll Number, Academic Details */}
      <div className="card-body-section">
        <h2 className="student-name" title={name}>{name}</h2>

        <div className="meta-row">
          <div className="meta-pill roll-pill" title="University Roll Number">
            <Hash size={13} className="meta-icon" />
            <span className="roll-text">{rollNumber}</span>
          </div>

          <div className="meta-pill sem-pill" title="Current Academic Semester">
            <BookOpen size={13} className="meta-icon" />
            <span>{semester}</span>
          </div>
        </div>

        {email && (
          <div className="email-row" title={`Send email to ${email}`}>
            <Mail size={12} className="email-icon" />
            <span className="email-text">{email}</span>
          </div>
        )}
      </div>

      {/* Card Footer: Highlighted CGPA Indicator */}
      <div className="card-cgpa-section">
        <div className="cgpa-top-info">
          <div className="cgpa-tier-indicator">
            <Award size={14} className="cgpa-award-icon" />
            <span className="cgpa-status-label">{cgpaTier.label}</span>
          </div>
          <div className="cgpa-badge-display">
            <span className="cgpa-val">{cgpa.toFixed(2)}</span>
            <span className="cgpa-scale">/ 10</span>
          </div>
        </div>

        {/* CGPA Progress visual meter */}
        <div className="cgpa-progress-track" title={`CGPA: ${cgpa} out of 10.0`}>
          <div
            className="cgpa-progress-fill"
            style={{ width: `${cgpaPercentage}%` }}
          />
        </div>

        <div className="cgpa-bottom-info">
          <span className="cgpa-rank-tier">{cgpaTier.tierBadge}</span>
          <span className="cgpa-percentile">
            <TrendingUp size={11} /> {cgpaPercentage.toFixed(0)}% Score
          </span>
        </div>
      </div>
    </article>
  );
};

export default StudentCard;
