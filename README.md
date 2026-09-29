# Assignment 2: Student Information Management using Props

A clean, modern, production-ready, and strictly mobile-responsive React application demonstrating unidirectional props data flow, component reusability, and responsive UI design across all device viewports.

## 🚀 Live Localhost Preview
- **Local Preview URL:** [http://localhost:5173/](http://localhost:5173/)

---

## 📱 Strict Mobile-Responsive Design Specifications

The application is engineered with explicit responsive design rules:

### 1. Responsive Grid Layout (`StudentList.css`)
- **Mobile Viewports (up to 768px):** Strict 1-column layout with cards taking 100% width.
- **Tablet Viewports (769px to 1024px):** Strict 2-column grid layout (`repeat(2, minmax(0, 1fr))`).
- **Desktop Viewports (1025px and above):** 3-column grid (`repeat(3, minmax(0, 1fr))`) and 4-column grid on wide screens (`1360px+`).

### 2. Dashboard Controls (`App.css`)
- **Mobile Devices (up to 768px):** Stacks controls vertically (`flex-direction: column`) with `100%` width on the search input, department dropdown, CGPA sort button, dropdown, and reset button. Enhanced min-height (`48px`) ensures touch-friendly interaction without accidental taps, and `font-size: 1rem` prevents iOS automatic input zooming.
- **Desktop & Tablets (769px and above):** Organizes controls horizontally (`flex-direction: row`) with proper spacing and flexible auto-widths.

### 3. Student Card Refinements (`StudentCard.css`)
- **Proportional Avatars:** Fixed aspect ratio (`aspect-ratio: 1 / 1`), `object-fit: cover`, `flex-shrink: 0`, and `object-position: center` ensure avatars never stretch or distort.
- **Ellipsis Text Truncation:** Enabled with `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` and `min-width: 0` on student names, department badges, and emails to prevent layout breaking.
- **Touch-Friendly Metrics:** Compact padding (`1rem`), optimized badge sizing, and scaled font sizes for smaller screens.

### 4. Header & Footer Adjustments (`Header.css`, `Footer.css`, `index.css`)
- **Dynamic Font Scaling:** Portal title scales smoothly from `1.4rem` on desktop down to `1.15rem` on mobile and `1.05rem` on compact mobile devices (under 420px) to prevent text overflow.
- **Safe-Area Inset Padding:** Page content, header, and footer feature consistent safe-area boundary padding (`padding-left: max(1rem, env(safe-area-inset-left)); padding-right: max(1rem, env(safe-area-inset-right));`).
- **Zero Horizontal Overflow:** Protected with `overflow-x: hidden` and `max-width: 100vw`.

---

## 🏛️ Component Architecture & Props Hierarchy

```
[App.jsx] (Root Controller: manages dummy data, sort state, search & department filters)
  │
  ├── [Header.jsx] (Props: title, subtitle, totalCount)
  │
  ├── [Dashboard Controls] (Sort by CGPA toggle & dropdown, Search, Department filter)
  │
  ├── [StudentList.jsx] (Props: students, emptyMessage)
  │     │
  │     └── [StudentCard.jsx] (Props: student)
  │           ├── Proportional High-Res Avatar with Fallback & Status Ring
  │           ├── Student Name (Truncated with Ellipsis) & Roll Number
  │           ├── Color-coded Department Badge (Truncated with Ellipsis)
  │           ├── Academic Semester Badge
  │           └── Dynamic CGPA Metric & Progress Meter
  │
  └── [Footer.jsx] (Copyright, assignment credits, and architecture notes)
```
