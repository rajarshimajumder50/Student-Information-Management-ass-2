import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import StudentList from './components/StudentList';
import Footer from './components/Footer';
import { STUDENTS_DATA } from './data/studentsData';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  SlidersHorizontal,
  RotateCcw,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import './App.css';

/**
 * App Component (Root Component)
 * 
 * Responsibilities:
 * 1. Holds and manages the student dataset (STUDENTS_DATA)
 * 2. Manages sorting state (CGPA Descending, Ascending, or Default)
 * 3. Manages auxiliary search query and department filter state
 * 4. Strictly passes the processed student array down to StudentList purely via Props
 * 5. Coordinates Header, Control toolbar, Summary stats, and Footer
 */
function App() {
  // Primary student data state (loaded from dummy dataset)
  const [students] = useState(STUDENTS_DATA);

  // Sorting state: 'desc' (highest first), 'asc' (lowest first), or 'none' (original order)
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Distinct departments extracted dynamically from dataset
  const departments = useMemo(() => {
    const depts = Array.from(new Set(students.map((s) => s.department)));
    return ['All', ...depts];
  }, [students]);

  // Derived filtered & sorted students list to be passed down strictly via props
  const processedStudents = useMemo(() => {
    let result = [...students];

    // 1. Filter by Department
    if (selectedDepartment !== 'All') {
      result = result.filter(
        (student) => student.department.toLowerCase() === selectedDepartment.toLowerCase()
      );
    }

    // 2. Filter by Search Query (Name or Roll Number)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(q) ||
          student.rollNumber.toLowerCase().includes(q)
      );
    }

    // 3. Sort by CGPA according to sortOrder state
    if (sortOrder === 'desc') {
      result.sort((a, b) => b.cgpa - a.cgpa);
    } else if (sortOrder === 'asc') {
      result.sort((a, b) => a.cgpa - b.cgpa);
    }

    return result;
  }, [students, sortOrder, selectedDepartment, searchQuery]);

  // Quick statistics calculation for the dashboard banner
  const stats = useMemo(() => {
    if (students.length === 0) return { total: 0, avgCgpa: 0, topCgpa: 0, honorsCount: 0 };
    const total = students.length;
    const totalCgpa = students.reduce((acc, s) => acc + s.cgpa, 0);
    const avgCgpa = (totalCgpa / total).toFixed(2);
    const topCgpa = Math.max(...students.map((s) => s.cgpa)).toFixed(2);
    const honorsCount = students.filter((s) => s.cgpa >= 9.0).length;
    return { total, avgCgpa, topCgpa, honorsCount };
  }, [students]);

  // Handler to toggle or switch CGPA sort order
  const toggleCgpaSort = () => {
    if (sortOrder === 'desc') {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('desc');
    }
  };

  // Reset all filters and return to default view
  const handleResetFilters = () => {
    setSortOrder('desc');
    setSearchQuery('');
    setSelectedDepartment('All');
  };

  return (
    <div className="app-layout">
      {/* 1. Header Component with branding & status */}
      <Header
        title="Student Information Management"
        subtitle="Assignment 2 • Modern React Props Data-Flow Architecture"
        totalCount={students.length}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-wrapper">

          {/* Institutional Stats Summary Strip */}
          <section className="stats-banner" aria-label="Portal Analytics">
            <div className="stat-card">
              <div className="stat-icon-wrapper stat-blue">
                <Users size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Enrolled</span>
                <span className="stat-value">{stats.total}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper stat-purple">
                <TrendingUp size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Average CGPA</span>
                <span className="stat-value">{stats.avgCgpa} <small>/10</small></span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper stat-amber">
                <Award size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Highest CGPA</span>
                <span className="stat-value">{stats.topCgpa}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper stat-emerald">
                <Sparkles size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Dean's List (9.0+)</span>
                <span className="stat-value">{stats.honorsCount} <small>Scholars</small></span>
              </div>
            </div>
          </section>

          {/* Interactive Control Center: Search, Department Filter, & CGPA Sort */}
          <section className="control-panel" aria-label="Search and Sorting Controls">
            <div className="control-panel-header">
              <div className="control-title-group">
                <SlidersHorizontal size={18} className="panel-icon" />
                <h2 className="control-heading">Directory Controls &amp; Sorting</h2>
              </div>
              <div className="control-count-badge">
                Showing <strong>{processedStudents.length}</strong> of {students.length} Students
              </div>
            </div>

            <div className="control-toolbar">
              {/* Search Bar */}
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by student name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Search students"
                />
                {searchQuery && (
                  <button
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>

              {/* Department Filter Dropdown */}
              <div className="dept-select-wrapper">
                <label htmlFor="dept-filter" className="sr-only">Filter by Department</label>
                <select
                  id="dept-filter"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="dept-select"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === 'All' ? '🏢 All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* CGPA Sort Control: Direct Toggle Button */}
              <div className="sort-actions">
                <button
                  type="button"
                  onClick={toggleCgpaSort}
                  className={`sort-toggle-btn ${sortOrder !== 'none' ? 'active' : ''}`}
                  title="Click to toggle CGPA sort direction"
                >
                  {sortOrder === 'desc' ? (
                    <>
                      <ArrowDown size={16} className="sort-icon-active" />
                      <span>CGPA: High to Low</span>
                    </>
                  ) : sortOrder === 'asc' ? (
                    <>
                      <ArrowUp size={16} className="sort-icon-active" />
                      <span>CGPA: Low to High</span>
                    </>
                  ) : (
                    <>
                      <ArrowUpDown size={16} />
                      <span>Sort by CGPA</span>
                    </>
                  )}
                </button>

                {/* CGPA Sort Dropdown selector for explicit choice */}
                <div className="sort-dropdown-wrapper">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="sort-dropdown"
                    aria-label="CGPA Sorting Option"
                  >
                    <option value="desc">CGPA: Descending (Highest First)</option>
                    <option value="asc">CGPA: Ascending (Lowest First)</option>
                    <option value="none">Default Order</option>
                  </select>
                </div>

                {/* Reset Filters button if any filter is active */}
                {(searchQuery || selectedDepartment !== 'All' || sortOrder !== 'desc') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="reset-btn"
                    title="Reset to default view"
                  >
                    <RotateCcw size={14} />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* 
            STRICT PROPS FLOW DEMONSTRATION:
            App component passes the processedStudents array downwards strictly via Props to StudentList.
            StudentList then iterates and passes each student object strictly via Props to StudentCard.
          */}
          <StudentList
            students={processedStudents}
            emptyMessage={
              searchQuery || selectedDepartment !== 'All'
                ? `No students found matching "${searchQuery || selectedDepartment}". Try adjusting your filters.`
                : "No student records available at this time."
            }
          />

        </div>
      </main>

      {/* 4. Footer Component with assignment credits & copyright */}
      <Footer />
    </div>
  );
}

export default App;
