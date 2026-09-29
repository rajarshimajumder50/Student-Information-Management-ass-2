import React from 'react';
import StudentCard from './StudentCard';
import { Users, AlertCircle, Sparkles } from 'lucide-react';
import './StudentList.css';

/**
 * StudentList Component
 * 
 * Core Architectural Requirement:
 * Receives the students array strictly via props and delegates the rendering
 * of each individual student profile to the reusable StudentCard component.
 * 
 * Props:
 * - students: Array of Student objects
 * - emptyMessage: string (optional custom message for empty queries)
 */
const StudentList = ({ students = [], emptyMessage = "No student records match the current criteria." }) => {
  // Empty state handling
  if (!students || students.length === 0) {
    return (
      <div className="empty-state-container">
        <div className="empty-icon-circle">
          <AlertCircle size={36} className="empty-icon" />
        </div>
        <h3 className="empty-title">No Students Found</h3>
        <p className="empty-description">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <section className="student-list-section" aria-label="Student Directory">
      {/* Grid of Student Cards */}
      <div className="students-grid">
        {students.map((student) => (
          <StudentCard
            key={student.id || student.rollNumber}
            student={student}
          />
        ))}
      </div>
    </section>
  );
};

export default StudentList;
