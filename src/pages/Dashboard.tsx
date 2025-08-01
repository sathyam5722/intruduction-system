import { Shield, AlertTriangle, Activity, Users, Eye, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { AlertsList } from '@/components/Dashboard/AlertsList';
import { NetworkStatus } from '@/components/Dashboard/NetworkStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Threats"
          value="3"
          change={{ value: "+2 today", type: "increase" }}
          icon={<AlertTriangle className="h-6 w-6" />}
          variant="critical"
        />
        <StatsCard
          title="Network Security"
          value="99.8%"
          change={{ value: "+0.1%", type: "decrease" }}
          icon={<Shield className="h-6 w-6" />}
          variant="success"
        />
        <StatsCard
          title="Active Monitors"
          value="247"
          icon={<Activity className="h-6 w-6" />}
        />
        <StatsCard
          title="Protected Assets"
          value="1,024"
          change={{ value: "+12 this week", type: "decrease" }}
          icon={<Eye className="h-6 w-6" />}
          variant="success"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <AlertsList />

        {/* Network Status */}
        <NetworkStatus />
      </div>

      {/* Threat Map and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Geographic Map */}
        <Card className="lg:col-span-2 card-elevated">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <span>Global Threat Map</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Interactive threat map will be displayed here</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-critical rounded-full"></div>
                    <span>High Risk (12)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span>Medium Risk (34)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Low Risk (8)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-elevated">
          <CardHeader className="border-b border-border">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <button className="w-full p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 transition-colors">
                <div className="font-medium text-primary">Run Security Scan</div>
                <div className="text-sm text-muted-foreground">Full network vulnerability assessment</div>
              </button>
              
              <button className="w-full p-4 text-left bg-warning/10 hover:bg-warning/20 rounded-lg border border-warning/20 transition-colors">
                <div className="font-medium text-warning">Update Threat Database</div>
                <div className="text-sm text-muted-foreground">Latest threat signatures</div>
              </button>
              
              <button className="w-full p-4 text-left bg-accent/10 hover:bg-accent/20 rounded-lg border border-accent/20 transition-colors">
                <div className="font-medium text-accent">Generate Report</div>
                <div className="text-sm text-muted-foreground">Weekly security summary</div>
              </button>
              
              <button className="w-full p-4 text-left bg-success/10 hover:bg-success/20 rounded-lg border border-success/20 transition-colors">
                <div className="font-medium text-success">System Backup</div>
                <div className="text-sm text-muted-foreground">Backup security configurations</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};