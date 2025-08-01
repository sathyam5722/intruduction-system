// Logs page specific JavaScript
const mockLogs = [
    {
        id: '1',
        timestamp: '2024-01-15 14:32:15.123',
        level: 'critical',
        source: 'IDS-Core',
        category: 'Security',
        message: 'Malware signature detected in network traffic',
        details: 'Signature: Trojan.Generic.KDV.123456 detected from source 192.168.1.45. Immediate action required to quarantine affected system.'
    },
    {
        id: '2',
        timestamp: '2024-01-15 14:31:42.456',
        level: 'warning',
        source: 'Auth-Service',
        category: 'Authentication',
        message: 'Multiple failed login attempts',
        details: 'User: admin, Source IP: 10.0.0.15, Attempts: 5. Account temporarily locked for security.'
    },
    {
        id: '3',
        timestamp: '2024-01-15 14:30:18.789',
        level: 'error',
        source: 'Network-Monitor',
        category: 'Network',
        message: 'DDoS attack pattern detected',
        details: 'Traffic volume exceeded threshold by 300% from external sources. Firewall rules automatically updated.'
    },
    {
        id: '4',
        timestamp: '2024-01-15 14:29:33.012',
        level: 'info',
        source: 'System-Monitor',
        category: 'System',
        message: 'Security scan completed successfully',
        details: 'Full system scan completed in 45 minutes, 0 threats found. Next scan scheduled for 2024-01-16 02:00:00.'
    },
    {
        id: '5',
        timestamp: '2024-01-15 14:28:07.345',
        level: 'warning',
        source: 'Firewall',
        category: 'Network',
        message: 'Port scan activity detected',
        details: 'Sequential port scanning from 203.0.113.5 targeting ports 22, 80, 443, 8080. Source IP blocked for 24 hours.'
    },
    {
        id: '6',
        timestamp: '2024-01-15 14:25:15.678',
        level: 'info',
        source: 'Auth-Service',
        category: 'Authentication',
        message: 'User session established',
        details: 'User: johndoe successfully authenticated from 192.168.1.100. Session ID: sess_abc123def456.'
    },
    {
        id: '7',
        timestamp: '2024-01-15 14:20:42.901',
        level: 'error',
        source: 'IDS-Core',
        category: 'System',
        message: 'Database connection timeout',
        details: 'Failed to connect to threat intelligence database after 30 seconds. Retrying connection...'
    },
    {
        id: '8',
        timestamp: '2024-01-15 14:18:25.234',
        level: 'critical',
        source: 'Network-Monitor',
        category: 'Security',
        message: 'Suspicious data exfiltration detected',
        details: 'Large volume of sensitive data transferred to external IP 198.51.100.25. Investigation required immediately.'
    }
];

let filteredLogs = [...mockLogs];
let selectedLog = null;

document.addEventListener('DOMContentLoaded', function() {
    initLogsPage();
});

function initLogsPage() {
    renderLogs(filteredLogs);
    
    // Add event listeners
    document.getElementById('log-search').addEventListener('input', filterLogs);
    document.getElementById('level-filter').addEventListener('change', filterLogs);
    document.getElementById('source-filter').addEventListener('change', filterLogs);
}

function renderLogs(logs) {
    const container = document.getElementById('logs-container');
    
    if (logs.length === 0) {
        container.innerHTML = `
            <div class="p-8 text-center text-muted-foreground">
                No logs match your current filters.
            </div>
        `;
        return;
    }
    
    container.innerHTML = logs.map(log => `
        <div class="log-entry p-4 border-b border-border hover:bg-card-hover transition-colors cursor-pointer ${
            selectedLog && selectedLog.id === log.id ? 'bg-primary/10' : ''
        }" onclick="selectLog('${log.id}')">
            <div class="flex items-start space-x-4">
                <div class="flex-1 space-y-1">
                    <div class="flex items-center space-x-2">
                        <span class="badge ${getLevelBadgeClass(log.level)}">${log.level.toUpperCase()}</span>
                        <span class="text-sm text-muted-foreground font-mono">${log.timestamp}</span>
                        <span class="text-sm text-muted-foreground">[${log.source}]</span>
                        <span class="text-sm text-muted-foreground">${log.category}</span>
                    </div>
                    <p class="text-sm text-foreground">${log.message}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function selectLog(logId) {
    selectedLog = mockLogs.find(log => log.id === logId);
    renderLogs(filteredLogs); // Re-render to update selection
    renderLogDetails();
}

function renderLogDetails() {
    const detailsContainer = document.getElementById('log-details');
    
    if (!selectedLog) {
        detailsContainer.innerHTML = `
            <div class="text-center text-muted-foreground py-8">
                Select a log entry to view details
            </div>
        `;
        return;
    }
    
    detailsContainer.innerHTML = `
        <div class="space-y-4">
            <div class="space-y-2">
                <span class="badge ${getLevelBadgeClass(selectedLog.level)}">${selectedLog.level.toUpperCase()}</span>
                <h3 class="font-medium">${selectedLog.message}</h3>
            </div>
            
            <div class="grid grid-cols-1 gap-3">
                <div>
                    <label class="text-sm font-medium text-muted-foreground">Timestamp</label>
                    <p class="font-mono text-sm">${selectedLog.timestamp}</p>
                </div>
                <div>
                    <label class="text-sm font-medium text-muted-foreground">Source</label>
                    <p class="text-sm">${selectedLog.source}</p>
                </div>
                <div>
                    <label class="text-sm font-medium text-muted-foreground">Category</label>
                    <p class="text-sm">${selectedLog.category}</p>
                </div>
                <div>
                    <label class="text-sm font-medium text-muted-foreground">Details</label>
                    <div class="mt-1 p-3 bg-muted/50 rounded text-sm">
                        ${selectedLog.details}
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-2">
                <button class="px-3 py-2 text-sm border border-border hover:bg-muted rounded transition-colors">
                    <i data-lucide="calendar" class="w-4 h-4 inline mr-1"></i>
                    View Timeline
                </button>
                <button class="px-3 py-2 text-sm border border-border hover:bg-muted rounded transition-colors">
                    <i data-lucide="filter" class="w-4 h-4 inline mr-1"></i>
                    Similar Logs
                </button>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

function filterLogs() {
    const searchTerm = document.getElementById('log-search').value.toLowerCase();
    const levelFilter = document.getElementById('level-filter').value;
    const sourceFilter = document.getElementById('source-filter').value;
    
    filteredLogs = mockLogs.filter(log => {
        const matchesSearch = log.message.toLowerCase().includes(searchTerm) ||
                             log.details.toLowerCase().includes(searchTerm);
        const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
        const matchesSource = sourceFilter === 'all' || log.source === sourceFilter;
        
        return matchesSearch && matchesLevel && matchesSource;
    });
    
    renderLogs(filteredLogs);
}

function getLevelBadgeClass(level) {
    switch (level) {
        case 'critical':
            return 'badge-critical';
        case 'error':
            return 'badge-critical';
        case 'warning':
            return 'badge-warning';
        case 'info':
            return 'badge-info';
        default:
            return 'badge';
    }
}