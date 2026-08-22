import {
  Menu,
  Sun,
  Moon,
  Settings,
  LogOut,
  Globe,
  ChevronDown,
} from 'lucide-react';

const PAGE_TITLES = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Overview of your CSC center',
  },
  important: {
    title: 'Important Tools',
    subtitle: 'Quick access to essential CSC tools',
  },
  documents: {
    title: 'Documents & Forms',
    subtitle: 'Manage and process digital documents',
  },
  certificates: {
    title: 'Certificates',
    subtitle: 'Manage certificate applications and services',
  },
  chatbot: {
    title: 'Customer Service',
    subtitle: 'Assist customers and manage enquiries',
  },
  billing: {
    title: 'Bill Payments',
    subtitle: 'Manage utility and bill payment services',
  },
  services: {
    title: 'CSC Services',
    subtitle: 'Access and manage CSC services',
  },
  jobs: {
    title: 'Jobs & Opportunities',
    subtitle: 'Explore jobs and career opportunities',
  },
  news: {
    title: 'News & Updates',
    subtitle: 'Stay updated with the latest information',
  },
  videos: {
    title: 'Service Videos',
    subtitle: 'Learn how to access CSC services',
  },
  schemes: {
    title: 'Government Schemes',
    subtitle: 'Explore government schemes and benefits',
  },
  agriculture: {
    title: 'Agriculture Services',
    subtitle: 'Access agriculture-related services',
  },
  education: {
    title: 'Education & Health',
    subtitle: 'Explore education and health services',
  },
  operator: {
    title: 'Operator Tools',
    subtitle: 'Manage your CSC operations',
  },
};

export default function Header({
  active,
  onToggle,
  lang,
  onLang,
  dark,
  onDark,
  operator,
  onLogout,
  onNav,
}) {
  const page = PAGE_TITLES[active] || {
    title: 'CSC AI Seva Center',
    subtitle: 'Digital services at your fingertips',
  };

  return (
    <header
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
      }}
    >
      {/* Sidebar Toggle */}
      <button
        onClick={onToggle}
        title="Toggle sidebar"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--muted)',
          cursor: 'pointer',
          padding: 6,
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Menu size={21} strokeWidth={2} />
      </button>

      {/* Page Title */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.2,
          }}
        >
          {page.title}
        </div>

        <div
          style={{
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {page.subtitle}
        </div>
      </div>

      {/* Dark Mode */}
      <button
        onClick={() => onDark(!dark)}
        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          background: 'none',
          border: '1.5px solid var(--border)',
          borderRadius: 20,
          padding: '5px 11px',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          color: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {dark ? <Sun size={15} /> : <Moon size={15} />}
        {dark ? 'Light' : 'Dark'}
      </button>

      {/* Language */}
      <div style={{ position: 'relative' }}>
        <select
          value={lang}
          onChange={(e) => onLang(e.target.value)}
          title="Select language"
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 20,
            padding: '6px 32px 6px 34px',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text)',
            cursor: 'pointer',
            outline: 'none',
            minWidth: 115,
          }}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>

        <Globe
          size={15}
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted)',
            pointerEvents: 'none',
          }}
        />

        <ChevronDown
          size={14}
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Operator Profile */}
      <button
        onClick={() => onNav?.('profile')}
        title="Open profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 11px',
          background: 'var(--bg)',
          border: 'none',
          borderRadius: 22,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'var(--navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          OP
        </div>

        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text)',
            lineHeight: 1.2,
            textAlign: 'left',
          }}
        >
          {operator?.name || 'Operator'}

          <small
            style={{
              display: 'block',
              fontSize: 9,
              color: 'var(--muted)',
              fontWeight: 500,
              marginTop: 2,
            }}
          >
            {operator?.cscId || 'CSC Operator'}
          </small>
        </span>
      </button>

      {/* Settings */}
      <button
        onClick={() => onNav?.('settings')}
        title="Settings"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--muted)',
          cursor: 'pointer',
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Settings size={19} />
      </button>

      {/* Logout */}
      <button
        onClick={onLogout}
        title="Sign out"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--muted)',
          cursor: 'pointer',
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LogOut size={19} />
      </button>
    </header>
  );
}