import { useState } from 'react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Header } from '@/components/Layout/Header';
import { Dashboard } from './Dashboard';
import { Monitoring } from './Monitoring';
import { Alerts } from './Alerts';
import { Network } from './Network';
import { Threats } from './Threats';
import { Logs } from './Logs';
import { Settings } from './Settings';

// Create placeholder components for remaining sections
const Forensics = () => (
  <div className="p-6 animate-slide-up">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Digital Forensics</h1>
      <p className="text-muted-foreground">Advanced digital forensics and incident investigation tools</p>
      <div className="mt-8 p-8 bg-card rounded-lg border border-border">
        <p className="text-muted-foreground">Forensics analysis interface coming soon...</p>
      </div>
    </div>
  </div>
);

const Users = () => (
  <div className="p-6 animate-slide-up">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">User Management</h1>
      <p className="text-muted-foreground">Manage system users, roles, and permissions</p>
      <div className="mt-8 p-8 bg-card rounded-lg border border-border">
        <p className="text-muted-foreground">User management interface coming soon...</p>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'monitoring':
        return <Monitoring />;
      case 'alerts':
        return <Alerts />;
      case 'network':
        return <Network />;
      case 'threats':
        return <Threats />;
      case 'logs':
        return <Logs />;
      case 'forensics':
        return <Forensics />;
      case 'users':
        return <Users />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <Header activeSection={activeSection} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
