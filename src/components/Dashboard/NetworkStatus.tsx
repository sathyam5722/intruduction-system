import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Wifi, Database, Shield, Cpu, HardDrive } from 'lucide-react';

interface NetworkMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: React.ReactNode;
}

export const NetworkStatus = () => {
  const [metrics, setMetrics] = useState<NetworkMetric[]>([
    {
      label: 'Network Traffic',
      value: 65,
      max: 100,
      unit: '%',
      status: 'normal',
      icon: <Activity className="h-4 w-4" />
    },
    {
      label: 'Bandwidth Usage',
      value: 85,
      max: 100,
      unit: 'Mbps',
      status: 'warning',
      icon: <Wifi className="h-4 w-4" />
    },
    {
      label: 'CPU Usage',
      value: 42,
      max: 100,
      unit: '%',
      status: 'normal',
      icon: <Cpu className="h-4 w-4" />
    },
    {
      label: 'Memory Usage',
      value: 78,
      max: 100,
      unit: '%',
      status: 'normal',
      icon: <HardDrive className="h-4 w-4" />
    },
    {
      label: 'Active Connections',
      value: 1247,
      max: 2000,
      unit: '',
      status: 'normal',
      icon: <Database className="h-4 w-4" />
    },
    {
      label: 'Threat Detection',
      value: 99.8,
      max: 100,
      unit: '%',
      status: 'normal',
      icon: <Shield className="h-4 w-4" />
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(
          metric.max,
          metric.value + (Math.random() - 0.5) * 10
        ))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-critical';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-success';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-critical';
      case 'warning':
        return 'bg-warning';
      default:
        return 'bg-primary';
    }
  };

  return (
    <Card className="card-elevated">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary" />
          <span>System Status</span>
          <Badge variant="secondary" className="ml-auto bg-success/20 text-success">
            Operational
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={getStatusColor(metric.status)}>
                    {metric.icon}
                  </div>
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className="text-sm font-mono">
                  {metric.value.toFixed(metric.label === 'Active Connections' ? 0 : 1)}{metric.unit}
                </span>
              </div>
              <div className="space-y-1">
                <Progress 
                  value={(metric.value / metric.max) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>{metric.max}{metric.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};