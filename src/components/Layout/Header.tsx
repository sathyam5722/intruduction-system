import { Bell, Search, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  activeSection: string;
}

export const Header = ({ activeSection }: HeaderProps) => {
  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Security Dashboard',
      monitoring: 'Real-time Monitoring',
      alerts: 'Alert Management',
      network: 'Network Analysis',
      threats: 'Threat Intelligence',
      logs: 'System Logs',
      forensics: 'Digital Forensics',
      users: 'User Management',
      settings: 'Settings',
    };
    return titles[section] || 'Dashboard';
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title and Breadcrumb */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {getSectionTitle(activeSection)}
          </h1>
          <p className="text-sm text-muted-foreground">
            SecureWatch IDS • Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts, logs, threats..."
              className="pl-10 w-80 bg-input border-border focus:border-primary"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-nav-hover">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-nav-hover">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">Security Analyst</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Security Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};