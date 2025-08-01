import { useState } from 'react';
import { Brain, Shield, Zap, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ThreatIntel {
  id: string;
  name: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  indicators: string[];
  firstSeen: string;
  lastSeen: string;
  confidence: number;
  source: string;
}

interface ThreatFeed {
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastUpdate: string;
  entries: number;
  confidence: number;
}

const mockThreats: ThreatIntel[] = [
  {
    id: '1',
    name: 'APT29 (Cozy Bear)',
    type: 'Advanced Persistent Threat',
    severity: 'critical',
    description: 'Russian state-sponsored threat group targeting government and private organizations',
    indicators: ['domain: evil-domain.com', 'ip: 203.0.113.45', 'hash: a1b2c3d4e5f6...'],
    firstSeen: '2024-01-10',
    lastSeen: '2024-01-15',
    confidence: 95,
    source: 'Government CTI'
  },
  {
    id: '2',
    name: 'Emotet Banking Trojan',
    type: 'Malware',
    severity: 'high',
    description: 'Banking trojan and email-based malware botnet',
    indicators: ['hash: f7e8d9c0b1a2...', 'domain: malicious-bank.net'],
    firstSeen: '2024-01-12',
    lastSeen: '2024-01-14',
    confidence: 88,
    source: 'Commercial Feed'
  },
  {
    id: '3',
    name: 'Phishing Campaign - Office365',
    type: 'Phishing',
    severity: 'medium',
    description: 'Credential harvesting campaign targeting Office365 users',
    indicators: ['url: fake-office365.com', 'ip: 198.51.100.23'],
    firstSeen: '2024-01-13',
    lastSeen: '2024-01-15',
    confidence: 72,
    source: 'Open Source'
  }
];

const mockFeeds: ThreatFeed[] = [
  {
    name: 'MISP Threat Sharing',
    status: 'active',
    lastUpdate: '2024-01-15 14:30:00',
    entries: 15420,
    confidence: 92
  },
  {
    name: 'Commercial Threat Intel',
    status: 'active',
    lastUpdate: '2024-01-15 14:25:00',
    entries: 8934,
    confidence: 95
  },
  {
    name: 'Government CTI Feed',
    status: 'active',
    lastUpdate: '2024-01-15 14:20:00',
    entries: 3456,
    confidence: 98
  },
  {
    name: 'Open Source Intel',
    status: 'error',
    lastUpdate: '2024-01-15 12:00:00',
    entries: 12543,
    confidence: 65
  }
];

export const Threats = () => {
  const [threats] = useState(mockThreats);
  const [feeds] = useState(mockFeeds);
  const [selectedThreat, setSelectedThreat] = useState<ThreatIntel | null>(null);

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

  const getFeedStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      case 'error':
        return 'bg-critical text-critical-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const threatStats = {
    total: threats.length,
    critical: threats.filter(t => t.severity === 'critical').length,
    high: threats.filter(t => t.severity === 'high').length,
    medium: threats.filter(t => t.severity === 'medium').length,
    low: threats.filter(t => t.severity === 'low').length,
  };

  return (
    <div className="p-6 space-y-6 animate-slide-up">
      {/* Threat Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-interactive border-primary/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{threatStats.total}</div>
              <div className="text-sm text-muted-foreground">Total Threats</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-critical/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-critical">{threatStats.critical}</div>
              <div className="text-sm text-muted-foreground">Critical</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-destructive/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive">{threatStats.high}</div>
              <div className="text-sm text-muted-foreground">High</div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-interactive border-warning/50">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{threatStats.medium}</div>
              <div className="text-sm text-muted-foreground">Medium</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="threats" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
          <TabsTrigger value="feeds">Intelligence Feeds</TabsTrigger>
          <TabsTrigger value="analysis">Threat Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Threat List */}
            <Card className="card-elevated">
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <span>Active Threats</span>
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {threats.map((threat) => (
                    <div
                      key={threat.id}
                      className={`p-4 border-b border-border hover:bg-card-hover transition-colors cursor-pointer ${
                        selectedThreat?.id === threat.id ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => setSelectedThreat(threat)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium text-foreground">{threat.name}</h3>
                            <p className="text-sm text-muted-foreground">{threat.type}</p>
                          </div>
                          <Badge className={getSeverityColor(threat.severity)} variant="secondary">
                            {threat.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Confidence: {threat.confidence}%</span>
                          <span>Last seen: {threat.lastSeen}</span>
                        </div>
                        
                        <Progress value={threat.confidence} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Details */}
            <Card className="card-elevated">
              <CardHeader className="border-b border-border">
                <CardTitle>Threat Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedThreat ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-medium">{selectedThreat.name}</h3>
                        <Badge className={getSeverityColor(selectedThreat.severity)} variant="secondary">
                          {selectedThreat.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedThreat.type}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedThreat.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Confidence</label>
                        <div className="mt-1">
                          <Progress value={selectedThreat.confidence} className="h-2" />
                          <p className="text-sm text-muted-foreground mt-1">{selectedThreat.confidence}%</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Source</label>
                        <p className="text-sm">{selectedThreat.source}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">First Seen</label>
                        <p className="text-sm">{selectedThreat.firstSeen}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Last Seen</label>
                        <p className="text-sm">{selectedThreat.lastSeen}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Indicators of Compromise (IoCs)</h4>
                      <div className="space-y-1">
                        {selectedThreat.indicators.map((indicator, index) => (
                          <div key={index} className="p-2 bg-muted/50 rounded text-sm font-mono">
                            {indicator}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Export IoCs
                      </Button>
                      <Button size="sm" variant="outline">
                        <Shield className="h-4 w-4 mr-1" />
                        Block Indicators
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Select a threat to view details
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feeds" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Intelligence Feeds</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {feeds.map((feed, index) => (
                  <div key={index} className="p-4 border-b border-border hover:bg-card-hover transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-foreground">{feed.name}</h3>
                          <Badge className={getFeedStatusColor(feed.status)} variant="secondary">
                            {feed.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {feed.entries.toLocaleString()} entries • Last update: {feed.lastUpdate}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm font-medium">Confidence: {feed.confidence}%</div>
                        <Progress value={feed.confidence} className="h-1 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader className="border-b border-border">
              <CardTitle>Threat Analysis Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center border border-border">
                <div className="text-center space-y-2">
                  <Brain className="h-12 w-12 text-primary mx-auto" />
                  <p className="text-muted-foreground">Advanced threat analysis and correlation</p>
                  <p className="text-sm text-muted-foreground">Attack pattern recognition and trend analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};