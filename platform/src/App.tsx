import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
  Home, ClipboardCheck, BarChart3, MapPin, ListChecks,
  MessageSquare, FileText, Users, Globe, BookOpen
} from 'lucide-react';
import Landing from './pages/Landing';
import Scorecard from './pages/Scorecard';
import Dashboard from './pages/Dashboard';
import Corridor from './pages/Corridor';
import Tracker from './pages/Tracker';
import Messaging from './pages/Messaging';
import Proposal from './pages/Proposal';
import Community from './pages/Community';
import Directory from './pages/Directory';
import Network from './pages/Network';

const navItems = [
  { section: 'Platform', items: [
    { path: '/', label: 'Home', icon: Home },
  ]},
  { section: 'Tier 1: Interactive Tools', items: [
    { path: '/scorecard', label: 'Readiness Scorecard', icon: ClipboardCheck },
    { path: '/dashboard', label: 'Leadership Dashboard', icon: BarChart3 },
    { path: '/corridor', label: 'Corridor Selector', icon: MapPin },
    { path: '/tracker', label: 'Implementation Tracker', icon: ListChecks },
  ]},
  { section: 'Tier 2: Communication', items: [
    { path: '/messaging', label: 'Messaging Generator', icon: MessageSquare },
    { path: '/proposal', label: 'Proposal Builder', icon: FileText },
    { path: '/community', label: 'Community Dashboard', icon: Users },
  ]},
  { section: 'Tier 3: Multi-City', items: [
    { path: '/directory', label: 'City Directory', icon: Globe },
    { path: '/network', label: 'Peer Network', icon: BookOpen },
  ]},
];

export default function App() {
  const location = useLocation();

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="sidebar-logo">
          <h1>Digital District OS</h1>
          <p>Communication & Leadership Platform</p>
        </div>
        {navItems.map((section) => (
          <div className="sidebar-section" key={section.section}>
            <div className="sidebar-section-title">{section.section}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive && (item.path === '/' ? location.pathname === '/' : true) ? 'active' : ''}`
                }
                end={item.path === '/'}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/corridor" element={<Corridor />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/network" element={<Network />} />
        </Routes>
      </main>
    </div>
  );
}
