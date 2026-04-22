# HTML to React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the 10 static HTML prototype pages into a unified, single-page React application using `react-router-dom`, preserving all the "Cyber-Glassmorphism" CSS styles, animations, and icons.

**Architecture:** 
1. Move global CSS from HTML `<style>` tags into `src/globals.css`.
2. Install and configure `react-router-dom` in `src/main.jsx`.
3. Create reusable layout components (e.g., `SidebarLayout` for dashboard pages).
4. Convert each `.html` file into a `.jsx` page component inside `src/pages/`.
5. Replace standard `<a href="...">` and `window.location.href` with React Router's `<Link>` and `useNavigate()`.

**Tech Stack:** React, Vite, Tailwind CSS, React Router DOM, Lucide React (Icons).

---

### Task 1: Setup React Router and Global Styles

**Files:**
- Create: `src/App.jsx`
- Modify: `src/main.jsx`
- Modify: `src/globals.css`
- Modify: `package.json`

- [ ] **Step 1: Install Dependencies**
```bash
npm install react-router-dom lucide-react
```

- [ ] **Step 2: Consolidate Global CSS**
Extract the shared CSS classes (`.bg-noise`, `.bg-holographic`, `.glass-panel`, `.input-cyber`, `.btn-cyber`, `.scroll-hidden`) from the HTML files and append them to `src/globals.css`.

- [ ] **Step 3: Setup Router in App.jsx**
Create `src/App.jsx` to define the routing structure.
```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NebulaLanding from './NebulaLanding';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NebulaLanding />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 4: Mount App in main.jsx**
Modify `src/main.jsx` to render `<App />` instead of `<NebulaLanding />`.

- [ ] **Step 5: Commit**
```bash
git add package.json package-lock.json src/globals.css src/App.jsx src/main.jsx
git commit -m "chore: setup react-router-dom and global css"
```

---

### Task 2: Create Reusable Layouts & Components

**Files:**
- Create: `src/components/CyberBackground.jsx`
- Create: `src/components/DashboardLayout.jsx`

- [ ] **Step 1: Create CyberBackground Component**
```jsx
export default function CyberBackground({ showHolographic = true, children }) {
  return (
    <div className="bg-nebula-base text-white antialiased min-h-screen relative overflow-x-hidden flex">
      <div className="bg-noise"></div>
      {showHolographic && <div className="bg-holographic fixed inset-0 pointer-events-none"></div>}
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create DashboardLayout Component**
Extract the sidebar from `home-ui-design.html` into a layout component that uses `<Outlet />` for child routes. Replace `<a>` with `Link` from `react-router-dom` and `lucide` icons with `lucide-react` components.

- [ ] **Step 3: Commit**
```bash
git add src/components/
git commit -m "feat: create reusable layout components"
```

---

### Task 3: Migrate Auth & Landing Pages

**Files:**
- Create: `src/pages/Login.jsx`
- Modify: `src/App.jsx`
- Modify: `src/NebulaLanding.jsx`

- [ ] **Step 1: Create Login Component**
Convert `public/login-ui-design.html` to `src/pages/Login.jsx`. Use `lucide-react` for icons. Use `useNavigate` for form submission to `/dashboard`.

- [ ] **Step 2: Update Landing Page Links**
In `src/NebulaLanding.jsx`, replace `<a href="/login-ui-design.html">` with `<Link to="/login">`.

- [ ] **Step 3: Add to Router**
Update `src/App.jsx` to include `<Route path="/login" element={<Login />} />`.

- [ ] **Step 4: Commit**
```bash
git add src/pages/Login.jsx src/App.jsx src/NebulaLanding.jsx
git commit -m "feat: migrate login page to react"
```

---

### Task 4: Migrate Dashboard Pages (Home, Profile, Schedule, Recordings, Settings)

**Files:**
- Create: `src/pages/Dashboard.jsx`
- Create: `src/pages/Profile.jsx`
- Create: `src/pages/Schedule.jsx`
- Create: `src/pages/Recordings.jsx`
- Create: `src/pages/Settings.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Dashboard Component**
Convert `public/home-ui-design.html` (main content area) to `src/pages/Dashboard.jsx`, wrapping it in `<DashboardLayout>`.

- [ ] **Step 2: Create Profile Component**
Convert `public/profile-ui-design.html` to `src/pages/Profile.jsx`, wrapping it in `<DashboardLayout>`.

- [ ] **Step 3: Create Other Dashboard Pages**
Convert `schedule`, `recordings`, and `settings` HTML files to React components.

- [ ] **Step 4: Add to Router**
Update `src/App.jsx` with routes for these pages.
```jsx
<Route element={<DashboardLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/recordings" element={<Recordings />} />
  <Route path="/settings" element={<Settings />} />
</Route>
<Route path="/schedule" element={<Schedule />} />
```

- [ ] **Step 5: Commit**
```bash
git add src/pages/ src/App.jsx
git commit -m "feat: migrate dashboard ecosystem to react"
```

---

### Task 5: Migrate Meeting Core Pages (Invite, Setup, Meeting, ScreenShare, Whiteboard)

**Files:**
- Create: `src/pages/Invite.jsx`
- Create: `src/pages/Setup.jsx`
- Create: `src/pages/Meeting.jsx`
- Create: `src/pages/ScreenShare.jsx`
- Create: `src/pages/Whiteboard.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Meeting Components**
Convert the remaining 5 HTML files to React components. Replace all `onclick="window.location.href=..."` with `onClick={() => navigate('...')}` or `<Link>`.

- [ ] **Step 2: Replace Lucide Script Tags**
Ensure all pages use `import { ... } from 'lucide-react'` instead of relying on the global `<script>lucide.createIcons();</script>`.

- [ ] **Step 3: Add to Router**
Add routes to `src/App.jsx`: `/invite`, `/setup`, `/meeting`, `/screenshare`, `/whiteboard`.

- [ ] **Step 4: Cleanup Public Folder**
Remove the 10 `.html` files from the `public/` directory since they are now React components.

- [ ] **Step 5: Commit**
```bash
git add src/pages/ src/App.jsx public/
git commit -m "feat: migrate meeting core to react and cleanup html"
```
