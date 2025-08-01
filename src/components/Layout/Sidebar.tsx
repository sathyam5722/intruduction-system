import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  BarChart3, 
  AlertTriangle, 
  Activity, 
  Network, 
  FileText, 
  Settings, 
  Users,
  Eye,
  Brain,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'monitoring', label: 'Real-time Monitor', icon: Activity },
  { id: 'alerts', label: 'Alert Management', icon: AlertTriangle },
  { id: 'network', label: 'Network Analysis', icon: Network },
  { id: 'threats', label: 'Threat Intelligence', icon: Brain },
  { id: 'logs', label: 'System Logs', icon: FileText },
  { id: 'forensics', label: 'Digital Forensics', icon: Eye },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-card border-r border-border h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary glow-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SecureWatch
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-nav-hover"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start transition-all duration-200",
                isActive 
                  ? "bg-nav-active text-primary-foreground glow-primary" 
                  : "hover:bg-nav-hover",
                isCollapsed ? "px-2" : "px-3"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-3")} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Status Indicator */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow"></div>
            <span className="text-muted-foreground">System Operational</span>
          </div>
        </div>
      )}
    </div>
  );
};