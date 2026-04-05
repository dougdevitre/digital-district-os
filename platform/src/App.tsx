import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
  Home, ClipboardCheck, BarChart3, MapPin, ListChecks,
  MessageSquare, FileText, Users, Globe, BookOpen,
  Play, CalendarDays, UserCheck, Megaphone, Presentation, Radio, ShieldCheck,
  GraduationCap, BookMarked, Heart, Library, Rocket, Star
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
import Workflow from './pages/Workflow';
import Timeline from './pages/Timeline';
import Stakeholders from './pages/Stakeholders';
import Communications from './pages/Communications';
import Presentations from './pages/Presentations';
import MissionControl from './pages/MissionControl';
import Objections from './pages/Objections';
import StudentHub from './pages/StudentHub';
import AcademicPrograms from './pages/AcademicPrograms';
import MentorNetwork from './pages/MentorNetwork';
import ResourceLibrary from './pages/ResourceLibrary';
import OnboardingWizard from './pages/OnboardingWizard';
import ImpactStories from './pages/ImpactStories';

const navItems = [
  { section: 'Platform', items: [
    { path: '/', label: 'Home', icon: Home },
    { path: '/mission-control', label: 'Mission Control', icon: Radio },
  ]},
  { section: 'Workflow Assistant', items: [
    { path: '/workflow', label: 'Guided Workflow', icon: Play },
    { path: '/timeline', label: 'Timeline & Tasks', icon: CalendarDays },
    { path: '/stakeholders', label: 'Stakeholder Tracker', icon: UserCheck },
    { path: '/communications', label: 'PR & Comms Calendar', icon: Megaphone },
    { path: '/presentations', label: 'Presentations', icon: Presentation },
    { path: '/objections', label: 'Objection Handler', icon: ShieldCheck },
  ]},
  { section: 'Assess & Plan', items: [
    { path: '/scorecard', label: 'Readiness Scorecard', icon: ClipboardCheck },
    { path: '/dashboard', label: 'Leadership Dashboard', icon: BarChart3 },
    { path: '/corridor', label: 'Corridor Selector', icon: MapPin },
    { path: '/tracker', label: 'Implementation Tracker', icon: ListChecks },
  ]},
  { section: 'Entrepreneurs', items: [
    { path: '/onboarding', label: 'Start a Business', icon: Rocket },
    { path: '/mentors', label: 'Mentor Network', icon: Heart },
    { path: '/stories', label: 'Impact Stories', icon: Star },
  ]},
  { section: 'Communicate', items: [
    { path: '/messaging', label: 'Messaging Generator', icon: MessageSquare },
    { path: '/proposal', label: 'Proposal Builder', icon: FileText },
    { path: '/community', label: 'Community Dashboard', icon: Users },
    { path: '/resources', label: 'Resource Library', icon: Library },
  ]},
  { section: 'Students & Academia', items: [
    { path: '/students', label: 'Student Hub', icon: GraduationCap },
    { path: '/programs', label: 'Academic Programs', icon: BookMarked },
  ]},
  { section: 'Scale', items: [
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
          <Route path="/mission-control" element={<MissionControl />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/stakeholders" element={<Stakeholders />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="/presentations" element={<Presentations />} />
          <Route path="/objections" element={<Objections />} />
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/corridor" element={<Corridor />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/community" element={<Community />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/network" element={<Network />} />
          <Route path="/students" element={<StudentHub />} />
          <Route path="/programs" element={<AcademicPrograms />} />
          <Route path="/mentors" element={<MentorNetwork />} />
          <Route path="/resources" element={<ResourceLibrary />} />
          <Route path="/onboarding" element={<OnboardingWizard />} />
          <Route path="/stories" element={<ImpactStories />} />
        </Routes>
      </main>
    </div>
  );
}
