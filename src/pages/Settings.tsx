import { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, Network, Users, Database, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export const Settings = () => {
  const [settings, setSettings] = useState({
    // Security Settings
    enableRealTimeScanning: true,
    enableHeuristics: true,
    quarantineThreats: true,
    blockSuspiciousIPs: true,
    threatSensitivity: 'medium',
    
    // Alert Settings
    emailAlerts: true,
    smsAlerts: false,
    slackIntegration: true,
    alertThreshold: 'medium',
    maxAlertsPerHour: '50',
    
    // Network Settings
    monitoringInterface: 'eth0',
    captureMode: 'promiscuous',
    maxPacketSize: '1500',
    bufferSize: '64',
    
    // System Settings
    logRetention: '90',
    backupInterval: 'daily',
    updateFrequency: 'automatic',
    
    // User Management
    passwordPolicy: 'strong',
    sessionTimeout: '30',
    twoFactorAuth: true,
    
    // Database Settings
    dbHost: 'localhost',
    dbPort: '5432',
    dbName: 'ids_database',
    connectionPoolSize: '10'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Here you would save to backend
  };

  const handleReset = () => {
    console.log('Resetting to defaults');
    // Reset to default values
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure your IDS system parameters</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Security Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="real-time-scanning">Real-time Scanning</Label>
                      <p className="text-sm text-muted-foreground">Monitor network traffic in real-time</p>
                    </div>
                    <Switch
                      id="real-time-scanning"
                      checked={settings.enableRealTimeScanning}
                      onCheckedChange={(checked) => handleSettingChange('enableRealTimeScanning', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="heuristics">Heuristic Analysis</Label>
                      <p className="text-sm text-muted-foreground">Enable behavioral threat detection</p>
                    </div>
                    <Switch
                      id="heuristics"
                      checked={settings.enableHeuristics}
                      onCheckedChange={(checked) => handleSettingChange('enableHeuristics', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="quarantine">Auto-quarantine Threats</Label>
                      <p className="text-sm text-muted-foreground">Automatically isolate detected threats</p>
                    </div>
                    <Switch
                      id="quarantine"
                      checked={settings.quarantineThreats}
                      onCheckedChange={(checked) => handleSettingChange('quarantineThreats', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="block-ips">Block Suspicious IPs</Label>
                      <p className="text-sm text-muted-foreground">Automatically block malicious IP addresses</p>
                    </div>
                    <Switch
                      id="block-ips"
                      checked={settings.blockSuspiciousIPs}
                      onCheckedChange={(checked) => handleSettingChange('blockSuspiciousIPs', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="threat-sensitivity">Threat Detection Sensitivity</Label>
                    <Select
                      value={settings.threatSensitivity}
                      onValueChange={(value) => handleSettingChange('threatSensitivity', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Fewer false positives</SelectItem>
                        <SelectItem value="medium">Medium - Balanced detection</SelectItem>
                        <SelectItem value="high">High - Maximum sensitivity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Alert Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send alerts via email</p>
                    </div>
                    <Switch
                      id="email-alerts"
                      checked={settings.emailAlerts}
                      onCheckedChange={(checked) => handleSettingChange('emailAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-alerts">SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
                    </div>
                    <Switch
                      id="sms-alerts"
                      checked={settings.smsAlerts}
                      onCheckedChange={(checked) => handleSettingChange('smsAlerts', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="slack-integration">Slack Integration</Label>
                      <p className="text-sm text-muted-foreground">Send alerts to Slack channels</p>
                    </div>
                    <Switch
                      id="slack-integration"
                      checked={settings.slackIntegration}
                      onCheckedChange={(checked) => handleSettingChange('slackIntegration', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="alert-threshold">Alert Threshold</Label>
                    <Select
                      value={settings.alertThreshold}
                      onValueChange={(value) => handleSettingChange('alertThreshold', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - All alerts</SelectItem>
                        <SelectItem value="medium">Medium - Important alerts</SelectItem>
                        <SelectItem value="high">High - Critical alerts only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="max-alerts">Max Alerts per Hour</Label>
                    <Input
                      id="max-alerts"
                      type="number"
                      value={settings.maxAlertsPerHour}
                      onChange={(e) => handleSettingChange('maxAlertsPerHour', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-primary" />
                <span>Network Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="monitoring-interface">Monitoring Interface</Label>
                    <Select
                      value={settings.monitoringInterface}
                      onValueChange={(value) => handleSettingChange('monitoringInterface', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eth0">eth0 - Primary Interface</SelectItem>
                        <SelectItem value="eth1">eth1 - Secondary Interface</SelectItem>
                        <SelectItem value="any">any - All Interfaces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="capture-mode">Capture Mode</Label>
                    <Select
                      value={settings.captureMode}
                      onValueChange={(value) => handleSettingChange('captureMode', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promiscuous">Promiscuous Mode</SelectItem>
                        <SelectItem value="monitor">Monitor Mode</SelectItem>
                        <SelectItem value="normal">Normal Mode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="packet-size">Max Packet Size (bytes)</Label>
                    <Input
                      id="packet-size"
                      type="number"
                      value={settings.maxPacketSize}
                      onChange={(e) => handleSettingChange('maxPacketSize', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="buffer-size">Buffer Size (MB)</Label>
                    <Input
                      id="buffer-size"
                      type="number"
                      value={settings.bufferSize}
                      onChange={(e) => handleSettingChange('bufferSize', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="log-retention">Log Retention (days)</Label>
                    <Input
                      id="log-retention"
                      type="number"
                      value={settings.logRetention}
                      onChange={(e) => handleSettingChange('logRetention', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="backup-interval">Backup Interval</Label>
                    <Select
                      value={settings.backupInterval}
                      onValueChange={(value) => handleSettingChange('backupInterval', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="update-frequency">Update Frequency</Label>
                    <Select
                      value={settings.updateFrequency}
                      onValueChange={(value) => handleSettingChange('updateFrequency', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select
                      value={settings.passwordPolicy}
                      onValueChange={(value) => handleSettingChange('passwordPolicy', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic - 8 characters</SelectItem>
                        <SelectItem value="strong">Strong - 12 characters + complexity</SelectItem>
                        <SelectItem value="enterprise">Enterprise - 16 characters + complexity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>Database Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="db-host">Database Host</Label>
                    <Input
                      id="db-host"
                      value={settings.dbHost}
                      onChange={(e) => handleSettingChange('dbHost', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="db-port">Database Port</Label>
                    <Input
                      id="db-port"
                      type="number"
                      value={settings.dbPort}
                      onChange={(e) => handleSettingChange('dbPort', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="db-name">Database Name</Label>
                    <Input
                      id="db-name"
                      value={settings.dbName}
                      onChange={(e) => handleSettingChange('dbName', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="pool-size">Connection Pool Size</Label>
                    <Input
                      id="pool-size"
                      type="number"
                      value={settings.connectionPoolSize}
                      onChange={(e) => handleSettingChange('connectionPoolSize', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};