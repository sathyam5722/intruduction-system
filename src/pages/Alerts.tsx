import { useState } from 'react';
import { AlertTriangle, Filter, Search, X, Eye, Archive, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  source: string;
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved' | 'dismissed';
  assignee?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Malware Detection - Trojan.Generic.KDV',
    description: 'Trojan.Generic.KDV.123456 detected in system memory on workstation WS-007',
    severity: 'critical',
    category: 'Malware',
    source: '192.168.1.45',
    timestamp: '2024-01-15 14:32:15',
    status: 'active',
    assignee: 'John Doe'
  },
  {
    id: '2',
    title: 'Unauthorized Access Attempt',
    description: 'Multiple failed login attempts detected from suspicious IP address',
    severity: 'high',
    category: 'Authentication',
    source: '10.0.0.15',
    timestamp: '2024-01-15 14:28:42',
    status: 'investigating'
  },
  {
    id: '3',
    title: 'DDoS Attack in Progress',
    description: 'High volume traffic detected from multiple external sources targeting web server',
    severity: 'high',
    category: 'Network',
    source: 'External',
    timestamp: '2024-01-15 14:25:18',
    status: 'active'
  },
  {
    id: '4',
    title: 'Port Scan Activity',
    description: 'Sequential port scanning detected from external IP address',
    severity: 'medium',
    category: 'Reconnaissance',
    source: '203.0.113.5',
    timestamp: '2024-01-15 14:20:33',
    status: 'resolved'
  },
  {
    id: '5',
    title: 'Suspicious Data Transfer',
    description: 'Unusual outbound data transfer pattern detected from database server',
    severity: 'critical',
    category: 'Data Exfiltration',
    source: '172.16.0.8',
    timestamp: '2024-01-15 14:15:07',
    status: 'investigating',
    assignee: 'Jane Smith'
  }
];

export const Alerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-critical text-critical-foreground';
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-critical text-critical-foreground';
      case 'investigating':
        return 'bg-warning text-warning-foreground';
      case 'resolved':
        return 'bg-success text-success-foreground';
      case 'dismissed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const handleSelectAlert = (alertId: string) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAlerts(
      selectedAlerts.length === filteredAlerts.length 
        ? [] 
        : filteredAlerts.map(alert => alert.id)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on alerts:`, selectedAlerts);
    setSelectedAlerts([]);
  };

  const severityStats = {
    critical: alerts.filter(a => a.severity === 'critical').length,
    high: alerts.filter(a => a.severity === 'high').length,
    medium: alerts.filter(a => a.severity === 'medium').length,
    low: alerts.filter(a => a.severity === 'low').length,
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-interactive border-critical/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-critical">{severityStats.critical}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-destructive/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{severityStats.high}</div>
              <div className="text-sm text-muted-foreground">High</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-warning/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{severityStats.medium}</div>
              <div className="text-sm text-muted-foreground">Medium</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-success/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{severityStats.low}</div>
              <div className="text-sm text-muted-foreground">Low</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="card-elevated">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-critical" />
              <span>Alert Management</span>
            </CardTitle>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {/* Filters */}
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        {/* Bulk Actions */}
        {selectedAlerts.length > 0 && (
          <div className="px-6 py-3 bg-muted/50 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedAlerts.length} alert(s) selected
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('resolve')}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Resolve
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')}>
                  <Archive className="h-4 w-4 mr-1" />
                  Archive
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('dismiss')}>
                  <X className="h-4 w-4 mr-1" />
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <CardContent className="p-0">
          <div className="space-y-1">
            {/* Select All */}
            <div className="p-4 border-b border-border bg-muted/20">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedAlerts.length === filteredAlerts.length && filteredAlerts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">Select All ({filteredAlerts.length})</span>
              </div>
            </div>
            
            {/* Alert List */}
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 border-b border-border hover:bg-card-hover transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={selectedAlerts.includes(alert.id)}
                    onCheckedChange={() => handleSelectAlert(alert.id)}
                  />
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium text-foreground">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <Badge className={getSeverityColor(alert.severity)} variant="secondary">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getStatusColor(alert.status)} variant="secondary">
                        {alert.status.toUpperCase()}
                      </Badge>
                      <span className="text-muted-foreground">Category: {alert.category}</span>
                      <span className="text-muted-foreground">Source: {alert.source}</span>
                      <span className="text-muted-foreground">{alert.timestamp}</span>
                      {alert.assignee && (
                        <span className="text-muted-foreground">Assigned: {alert.assignee}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredAlerts.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No alerts match your current filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};