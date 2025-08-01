// Alerts page specific JavaScript
const mockAlerts = [
    {
        id: '1',
        timestamp: '2024-01-15 14:32:15',
        severity: 'critical',
        status: 'active',
        title: 'Malware Detected',
        description: 'Trojan.Generic.KDV.123456 detected in network traffic from workstation WS-001',
        source: 'Endpoint Protection',
        affectedAssets: ['WS-001', '192.168.1.45'],
        category: 'Malware'
    },
    {
        id: '2',
        timestamp: '2024-01-15 14:25:42',
        severity: 'high',
        status: 'investigating',
        title: 'Suspicious Login Activity',
        description: 'Multiple failed login attempts detected from external IP address',
        source: 'Authentication System',
        affectedAssets: ['AUTH-SRV-01', '203.0.113.15'],
        category: 'Authentication'
    },
    {
        id: '3',
        timestamp: '2024-01-15 14:18:33',
        severity: 'high',
        status: 'active',
        title: 'DDoS Attack Pattern',
        description: 'Unusual traffic volume detected from multiple external sources',
        source: 'Network Monitor',
        affectedAssets: ['FW-01', 'Multiple IPs'],
        category: 'Network Attack'
    },
    {
        id: '4',
        timestamp: '2024-01-15 14:10:22',
        severity: 'medium',
        status: 'resolved',
        title: 'Port Scan Detected',
        description: 'Sequential port scanning activity targeting web servers',
        source: 'Intrusion Detection',
        affectedAssets: ['WEB-SRV-01', '203.0.113.25'],
        category: 'Reconnaissance'
    },
    {
        id: '5',
        timestamp: '2024-01-15 13:58:17',
        severity: 'medium',
        status: 'active',
        title: 'Privilege Escalation Attempt',
        description: 'Unauthorized attempt to gain administrative privileges detected',
        source: 'Host Monitor',
        affectedAssets: ['DB-SRV-02'],
        category: 'Privilege Escalation'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initAlertsPage();
});

function initAlertsPage() {
    renderAlerts(mockAlerts);
    
    // Add filter functionality
    const severityFilter = document.querySelector('select[value="all"]');
    const statusFilter = document.querySelectorAll('select')[1];
    
    if (severityFilter) {
        severityFilter.addEventListener('change', filterAlerts);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', filterAlerts);
    }
}

function renderAlerts(alerts) {
    const container = document.getElementById('alerts-container');
    
    if (alerts.length === 0) {
        container.innerHTML = `
            <div class="p-8 text-center text-muted-foreground">
                No alerts match your current filters.
            </div>
        `;
        return;
    }
    
    container.innerHTML = alerts.map(alert => `
        <div class="alert-item border-b border-border p-6 hover:bg-card-hover transition-colors cursor-pointer"
             onclick="showAlertDetails('${alert.id}')">
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0 pt-1">
                    <div class="w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}"></div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center space-x-2">
                                <h3 class="text-lg font-medium text-foreground">${alert.title}</h3>
                                <span class="badge ${getSeverityBadgeClass(alert.severity)}">
                                    ${alert.severity.toUpperCase()}
                                </span>
                                <span class="badge ${getStatusBadgeClass(alert.status)}">
                                    ${alert.status.toUpperCase()}
                                </span>
                            </div>
                            <p class="mt-1 text-sm text-muted-foreground">${alert.description}</p>
                            <div class="mt-2 flex items-center space-x-4 text-xs text-muted-foreground">
                                <span>
                                    <i data-lucide="clock" class="w-3 h-3 inline mr-1"></i>
                                    ${alert.timestamp}
                                </span>
                                <span>
                                    <i data-lucide="tag" class="w-3 h-3 inline mr-1"></i>
                                    ${alert.category}
                                </span>
                                <span>
                                    <i data-lucide="server" class="w-3 h-3 inline mr-1"></i>
                                    ${alert.source}
                                </span>
                            </div>
                        </div>
                        <div class="flex-shrink-0 ml-4">
                            <button class="p-2 hover:bg-muted rounded-lg transition-colors">
                                <i data-lucide="more-vertical" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize lucide icons
    lucide.createIcons();
}

function getSeverityColor(severity) {
    switch (severity) {
        case 'critical':
            return 'bg-critical';
        case 'high':
            return 'bg-warning';
        case 'medium':
            return 'bg-info';
        case 'low':
            return 'bg-success';
        default:
            return 'bg-muted';
    }
}

function getSeverityBadgeClass(severity) {
    switch (severity) {
        case 'critical':
            return 'badge-critical';
        case 'high':
            return 'badge-warning';
        case 'medium':
            return 'badge-info';
        case 'low':
            return 'badge-success';
        default:
            return 'badge';
    }
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'active':
            return 'badge-critical';
        case 'investigating':
            return 'badge-warning';
        case 'resolved':
            return 'badge-success';
        default:
            return 'badge';
    }
}

function filterAlerts() {
    const severitySelect = document.querySelectorAll('select')[0];
    const statusSelect = document.querySelectorAll('select')[1];
    
    const severityFilter = severitySelect.value;
    const statusFilter = statusSelect.value;
    
    let filteredAlerts = mockAlerts;
    
    if (severityFilter !== 'all') {
        filteredAlerts = filteredAlerts.filter(alert => alert.severity === severityFilter);
    }
    
    if (statusFilter !== 'all') {
        filteredAlerts = filteredAlerts.filter(alert => alert.status === statusFilter);
    }
    
    renderAlerts(filteredAlerts);
}

function showAlertDetails(alertId) {
    const alert = mockAlerts.find(a => a.id === alertId);
    if (!alert) return;
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold">Alert Details</h2>
                <button onclick="this.closest('.fixed').remove()" class="p-2 hover:bg-muted rounded-lg transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            
            <div class="space-y-4">
                <div class="flex items-center space-x-2">
                    <span class="badge ${getSeverityBadgeClass(alert.severity)}">${alert.severity.toUpperCase()}</span>
                    <span class="badge ${getStatusBadgeClass(alert.status)}">${alert.status.toUpperCase()}</span>
                </div>
                
                <div>
                    <h3 class="font-medium text-lg">${alert.title}</h3>
                    <p class="text-muted-foreground mt-1">${alert.description}</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-muted-foreground">Timestamp</label>
                        <p class="font-mono text-sm">${alert.timestamp}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-muted-foreground">Source</label>
                        <p class="text-sm">${alert.source}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-muted-foreground">Category</label>
                        <p class="text-sm">${alert.category}</p>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-muted-foreground">Affected Assets</label>
                        <p class="text-sm">${alert.affectedAssets.join(', ')}</p>
                    </div>
                </div>
                
                <div class="flex space-x-2 pt-4">
                    <button class="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition-colors">
                        <i data-lucide="check" class="w-4 h-4 inline mr-1"></i>
                        Mark Resolved
                    </button>
                    <button class="px-4 py-2 bg-warning hover:bg-warning/80 text-warning-foreground rounded-lg transition-colors">
                        <i data-lucide="eye" class="w-4 h-4 inline mr-1"></i>
                        Investigate
                    </button>
                    <button class="px-4 py-2 border border-border hover:bg-muted rounded-lg transition-colors">
                        <i data-lucide="x" class="w-4 h-4 inline mr-1"></i>
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    lucide.createIcons();
    
    // Close modal on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}