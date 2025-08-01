import { useState } from 'react';
import { FileText, Search, Filter, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  source: string;
  category: string;
  message: string;
  details?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15 14:32:15.123',
    level: 'critical',
    source: 'IDS-Core',
    category: 'Security',
    message: 'Malware signature detected in network traffic',
    details: 'Signature: Trojan.Generic.KDV.123456 detected from source 192.168.1.45'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:31:42.456',
    level: 'warning',
    source: 'Auth-Service',
    category: 'Authentication',
    message: 'Multiple failed login attempts',
    details: 'User: admin, Source IP: 10.0.0.15, Attempts: 5'
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:30:18.789',
    level: 'error',
    source: 'Network-Monitor',
    category: 'Network',
    message: 'DDoS attack pattern detected',
    details: 'Traffic volume exceeded threshold by 300% from external sources'
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:29:33.012',
    level: 'info',
    source: 'System-Monitor',
    category: 'System',
    message: 'Security scan completed successfully',
    details: 'Full system scan completed in 45 minutes, 0 threats found'
  },
  {
    id: '5',
    timestamp: '2024-01-15 14:28:07.345',
    level: 'warning',
    source: 'Firewall',
    category: 'Network',
    message: 'Port scan activity detected',
    details: 'Sequential port scanning from 203.0.113.5 targeting ports 22, 80, 443, 8080'
  }
];

export const Logs = () => {
  const [logs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-critical text-critical-foreground';
      case 'error':
        return 'bg-destructive text-destructive-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'info':
        return 'bg-info text-info-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesSource = sourceFilter === 'all' || log.source === sourceFilter;
    return matchesSearch && matchesLevel && matchesSource;
  });

  const uniqueSources = [...new Set(logs.map(log => log.source))];

  const logStats = {
    total: logs.length,
    critical: logs.filter(l => l.level === 'critical').length,
    error: logs.filter(l => l.level === 'error').length,
    warning: logs.filter(l => l.level === 'warning').length,
    info: logs.filter(l => l.level === 'info').length,
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="card-interactive border-primary/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{logStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Logs</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-critical/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-critical">{logStats.critical}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-destructive/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{logStats.error}</div>
              <div className="text-sm text-muted-foreground">Error</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-warning/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{logStats.warning}</div>
              <div className="text-sm text-muted-foreground">Warning</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-info/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{logStats.info}</div>
              <div className="text-sm text-muted-foreground">Info</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Log Viewer */}
        <Card className="lg:col-span-2 card-elevated">
          <CardHeader className="border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>System Logs</span>
              </CardTitle>
              
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                {/* Filters */}
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {uniqueSources.map(source => (
                      <SelectItem key={source} value={source}>{source}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-1">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-4 border-b border-border hover:bg-card-hover transition-colors cursor-pointer ${
                      selectedLog?.id === log.id ? 'bg-primary/10' : ''
                    }`}
                    onClick={() => setSelectedLog(log)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge className={getLevelColor(log.level)} variant="secondary">
                            {log.level.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground font-mono">
                            {log.timestamp}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            [{log.source}]
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {log.category}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{log.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredLogs.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No logs match your current filters.
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Log Details */}
        <Card className="card-elevated">
          <CardHeader className="border-b border-border">
            <CardTitle>Log Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {selectedLog ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Badge className={getLevelColor(selectedLog.level)} variant="secondary">
                    {selectedLog.level.toUpperCase()}
                  </Badge>
                  <h3 className="font-medium">{selectedLog.message}</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                    <p className="font-mono text-sm">{selectedLog.timestamp}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Source</label>
                    <p className="text-sm">{selectedLog.source}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <p className="text-sm">{selectedLog.category}</p>
                  </div>
                  {selectedLog.details && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Details</label>
                      <div className="mt-1 p-3 bg-muted/50 rounded text-sm">
                        {selectedLog.details}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-1" />
                    View Timeline
                  </Button>
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 mr-1" />
                    Similar Logs
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Select a log entry to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};