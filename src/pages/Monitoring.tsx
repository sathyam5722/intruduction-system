import { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Network, Zap, Pause, Play, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface NetworkEvent {
  id: string;
  timestamp: string;
  type: string;
  source: string;
  destination: string;
  protocol: string;
  status: 'normal' | 'suspicious' | 'malicious';
}

export const Monitoring = () => {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const [stats, setStats] = useState({
    packetsPerSecond: 0,
    bandwidth: 0,
    connections: 0,
    threats: 0
  });

  // Simulate real-time monitoring
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Update stats
      setStats({
        packetsPerSecond: Math.floor(Math.random() * 1000) + 500,
        bandwidth: Math.floor(Math.random() * 50) + 20,
        connections: Math.floor(Math.random() * 200) + 800,
        threats: Math.floor(Math.random() * 5)
      });

      // Add new event
      const newEvent: NetworkEvent = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        type: ['HTTP', 'HTTPS', 'SSH', 'FTP', 'DNS'][Math.floor(Math.random() * 5)],
        source: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
        destination: `10.0.0.${Math.floor(Math.random() * 254) + 1}`,
        protocol: 'TCP',
        status: Math.random() > 0.9 ? 'suspicious' : 'normal'
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 49)]);
    }, 1000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'malicious':
        return 'bg-critical text-critical-foreground';
      case 'suspicious':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-success text-success-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Control Panel */}
      <Card className="card-elevated">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Real-time Monitoring</span>
              <Badge variant={isMonitoring ? "default" : "secondary"} className="ml-2">
                {isMonitoring ? 'ACTIVE' : 'PAUSED'}
              </Badge>
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                variant={isMonitoring ? "destructive" : "default"}
                size="sm"
              >
                {isMonitoring ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isMonitoring ? 'Pause' : 'Resume'}
              </Button>
              <Button onClick={() => setEvents([])} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Packets/Sec</p>
                <p className="text-2xl font-bold text-primary">{stats.packetsPerSecond.toLocaleString()}</p>
              </div>
              <Network className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bandwidth</p>
                <p className="text-2xl font-bold text-accent">{stats.bandwidth} Mbps</p>
              </div>
              <Activity className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Connections</p>
                <p className="text-2xl font-bold text-success">{stats.connections.toLocaleString()}</p>
              </div>
              <Cpu className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Threats Detected</p>
                <p className="text-2xl font-bold text-critical">{stats.threats}</p>
              </div>
              <Zap className="h-8 w-8 text-critical" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Activity Feed */}
      <Card className="card-elevated">
        <CardHeader className="border-b border-border">
          <CardTitle>Live Network Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-auto">
            <table className="w-full">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Time</th>
                  <th className="text-left p-3 text-sm font-medium">Type</th>
                  <th className="text-left p-3 text-sm font-medium">Source</th>
                  <th className="text-left p-3 text-sm font-medium">Destination</th>
                  <th className="text-left p-3 text-sm font-medium">Protocol</th>
                  <th className="text-left p-3 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-border hover:bg-card-hover transition-colors"
                  >
                    <td className="p-3 text-sm font-mono">{event.timestamp}</td>
                    <td className="p-3 text-sm">{event.type}</td>
                    <td className="p-3 text-sm font-mono">{event.source}</td>
                    <td className="p-3 text-sm font-mono">{event.destination}</td>
                    <td className="p-3 text-sm">{event.protocol}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(event.status)} variant="secondary">
                        {event.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {events.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No network activity detected. Start monitoring to see real-time events.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};