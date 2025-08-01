import { useState, useEffect } from 'react';
import { Network as NetworkIcon, Globe, Server, Router, Smartphone, Laptop } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  mac: string;
  type: 'server' | 'workstation' | 'router' | 'mobile' | 'printer';
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  traffic: number;
}

interface NetworkSegment {
  name: string;
  range: string;
  devices: number;
  bandwidth: number;
  status: 'healthy' | 'warning' | 'critical';
}

const mockDevices: NetworkDevice[] = [
  {
    id: '1',
    name: 'DC-01',
    ip: '192.168.1.10',
    mac: '00:1B:44:11:3A:B7',
    type: 'server',
    status: 'online',
    lastSeen: '2024-01-15 14:32:15',
    traffic: 85
  },
  {
    id: '2',
    name: 'WS-007',
    ip: '192.168.1.45',
    mac: '00:1B:44:11:3A:C8',
    type: 'workstation',
    status: 'warning',
    lastSeen: '2024-01-15 14:30:22',
    traffic: 15
  },
  {
    id: '3',
    name: 'Router-Main',
    ip: '192.168.1.1',
    mac: '00:1B:44:11:3A:D9',
    type: 'router',
    status: 'online',
    lastSeen: '2024-01-15 14:32:10',
    traffic: 95
  },
  {
    id: '4',
    name: 'iPhone-John',
    ip: '192.168.1.156',
    mac: '00:1B:44:11:3A:EA',
    type: 'mobile',
    status: 'online',
    lastSeen: '2024-01-15 14:31:45',
    traffic: 5
  }
];

const mockSegments: NetworkSegment[] = [
  {
    name: 'Management Network',
    range: '192.168.1.0/24',
    devices: 45,
    bandwidth: 78,
    status: 'healthy'
  },
  {
    name: 'DMZ',
    range: '10.0.1.0/24',
    devices: 12,
    bandwidth: 92,
    status: 'warning'
  },
  {
    name: 'Guest Network',
    range: '172.16.0.0/24',
    devices: 23,
    bandwidth: 34,
    status: 'healthy'
  }
];

export const Network = () => {
  const [devices, setDevices] = useState(mockDevices);
  const [segments] = useState(mockSegments);
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="h-5 w-5" />;
      case 'router':
        return <Router className="h-5 w-5" />;
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'workstation':
        return <Laptop className="h-5 w-5" />;
      default:
        return <NetworkIcon className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'offline':
        return 'bg-critical text-critical-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSegmentStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-critical';
      default:
        return 'text-muted-foreground';
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        traffic: Math.max(0, Math.min(100, device.traffic + (Math.random() - 0.5) * 20))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <Tabs defaultValue="topology" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="topology">Network Topology</TabsTrigger>
          <TabsTrigger value="devices">Device Management</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="topology" className="space-y-6">
          {/* Network Segments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {segments.map((segment, index) => (
              <Card key={index} className="card-interactive">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{segment.name}</span>
                    <Badge className={`${getStatusColor(segment.status)}`} variant="secondary">
                      {segment.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{segment.range}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Active Devices</span>
                      <span className="font-medium">{segment.devices}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Bandwidth Usage</span>
                        <span className="font-medium">{segment.bandwidth}%</span>
                      </div>
                      <Progress value={segment.bandwidth} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Network Topology Visualization */}
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <span>Network Topology</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
                <div className="text-center space-y-4">
                  <Globe className="h-16 w-16 text-primary mx-auto" />
                  <p className="text-muted-foreground">Interactive network topology visualization</p>
                  <p className="text-sm text-muted-foreground">Shows real-time connections and data flow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device List */}
            <Card className="card-elevated">
              <CardHeader className="border-b border-border">
                <CardTitle>Network Devices</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className={`p-4 border-b border-border hover:bg-card-hover transition-colors cursor-pointer ${
                        selectedDevice?.id === device.id ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => setSelectedDevice(device)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-primary">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <div className="font-medium">{device.name}</div>
                            <div className="text-sm text-muted-foreground">{device.ip}</div>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge className={getStatusColor(device.status)} variant="secondary">
                            {device.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            Traffic: {device.traffic}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Details */}
            <Card className="card-elevated">
              <CardHeader className="border-b border-border">
                <CardTitle>Device Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedDevice ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-primary">
                        {getDeviceIcon(selectedDevice.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">{selectedDevice.name}</h3>
                        <Badge className={getStatusColor(selectedDevice.status)} variant="secondary">
                          {selectedDevice.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">IP Address</label>
                        <p className="font-mono">{selectedDevice.ip}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">MAC Address</label>
                        <p className="font-mono">{selectedDevice.mac}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Device Type</label>
                        <p className="capitalize">{selectedDevice.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Last Seen</label>
                        <p>{selectedDevice.lastSeen}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Traffic Usage</label>
                      <div className="mt-2">
                        <Progress value={selectedDevice.traffic} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-1">{selectedDevice.traffic}% of capacity</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Ping Device</Button>
                      <Button size="sm" variant="outline">View Logs</Button>
                      <Button size="sm" variant="outline">Block Device</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Select a device to view details
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle>Traffic Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
                <div className="text-center space-y-2">
                  <NetworkIcon className="h-12 w-12 text-primary mx-auto" />
                  <p className="text-muted-foreground">Real-time traffic analysis charts</p>
                  <p className="text-sm text-muted-foreground">Bandwidth usage, protocol breakdown, and flow monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};