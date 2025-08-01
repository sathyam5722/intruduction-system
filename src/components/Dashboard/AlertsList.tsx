import { AlertTriangle, Clock, MapPin, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Alert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: string;
  description: string;
  location?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'Malware Detection',
    severity: 'critical',
    source: '192.168.1.45',
    timestamp: '2024-01-15 14:32:15',
    description: 'Trojan.Generic.KDV.123456 detected in system memory',
    location: 'Workstation-07'
  },
  {
    id: '2',
    type: 'Unauthorized Access',
    severity: 'high',
    source: '10.0.0.15',
    timestamp: '2024-01-15 14:28:42',
    description: 'Multiple failed login attempts from suspicious IP',
  },
  {
    id: '3',
    type: 'DDoS Attack',
    severity: 'high',
    source: 'External',
    timestamp: '2024-01-15 14:25:18',
    description: 'High volume traffic detected from multiple sources',
  },
  {
    id: '4',
    type: 'Port Scan',
    severity: 'medium',
    source: '203.0.113.5',
    timestamp: '2024-01-15 14:20:33',
    description: 'Sequential port scanning detected',
  },
  {
    id: '5',
    type: 'Data Exfiltration',
    severity: 'critical',
    source: '172.16.0.8',
    timestamp: '2024-01-15 14:15:07',
    description: 'Unusual outbound data transfer detected',
    location: 'Database Server'
  }
];

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

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <Zap className="h-4 w-4" />;
    case 'high':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

export const AlertsList = () => {
  return (
    <Card className="card-elevated">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-critical" />
            <span>Recent Alerts</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-1 p-4">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-lg border border-border hover:bg-card-hover transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(alert.severity)} variant="secondary">
                        {getSeverityIcon(alert.severity)}
                        <span className="ml-1">{alert.severity.toUpperCase()}</span>
                      </Badge>
                      <span className="font-medium text-foreground">{alert.type}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Source: {alert.source}</span>
                      </div>
                      {alert.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};