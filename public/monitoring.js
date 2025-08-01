// Monitoring page specific JavaScript
let isMonitoring = true;
let monitoringInterval;
let events = [];

document.addEventListener('DOMContentLoaded', function() {
    initMonitoringPage();
});

function initMonitoringPage() {
    const toggleBtn = document.getElementById('toggle-monitoring');
    const clearBtn = document.getElementById('clear-logs');
    const statusBadge = document.getElementById('monitoring-status');
    
    // Toggle monitoring
    toggleBtn.addEventListener('click', function() {
        isMonitoring = !isMonitoring;
        
        if (isMonitoring) {
            toggleBtn.innerHTML = '<i data-lucide="pause" class="w-4 h-4 inline mr-1"></i>Pause';
            toggleBtn.className = 'px-4 py-2 bg-critical hover:bg-critical/80 text-critical-foreground rounded-lg transition-colors';
            statusBadge.textContent = 'ACTIVE';
            statusBadge.className = 'badge badge-success ml-4';
            startMonitoring();
        } else {
            toggleBtn.innerHTML = '<i data-lucide="play" class="w-4 h-4 inline mr-1"></i>Resume';
            toggleBtn.className = 'px-4 py-2 bg-success hover:bg-success/80 text-success-foreground rounded-lg transition-colors';
            statusBadge.textContent = 'PAUSED';
            statusBadge.className = 'badge badge-warning ml-4';
            stopMonitoring();
        }
        
        lucide.createIcons();
    });
    
    // Clear logs
    clearBtn.addEventListener('click', function() {
        events = [];
        updateActivityFeed();
        showNotification('Activity feed cleared', 'info');
    });
    
    // Start monitoring by default
    startMonitoring();
}

function startMonitoring() {
    if (monitoringInterval) {
        clearInterval(monitoringInterval);
    }
    
    monitoringInterval = setInterval(() => {
        updateStats();
        addNewEvent();
    }, 1000);
}

function stopMonitoring() {
    if (monitoringInterval) {
        clearInterval(monitoringInterval);
        monitoringInterval = null;
    }
}

function updateStats() {
    // Update packets per second
    const packetsPerSec = Math.floor(Math.random() * 1000) + 500;
    document.getElementById('packets-per-sec').textContent = packetsPerSec.toLocaleString();
    
    // Update bandwidth
    const bandwidth = Math.floor(Math.random() * 50) + 20;
    document.getElementById('bandwidth').textContent = bandwidth + ' Mbps';
    
    // Update active connections
    const connections = Math.floor(Math.random() * 200) + 800;
    document.getElementById('active-connections').textContent = connections.toLocaleString();
    
    // Update threats detected
    const threats = Math.floor(Math.random() * 5);
    document.getElementById('threats-detected').textContent = threats;
}

function addNewEvent() {
    const newEvent = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString(),
        type: getRandomEventType(),
        source: getRandomIP(),
        destination: getRandomIP('internal'),
        protocol: 'TCP',
        status: Math.random() > 0.9 ? 'suspicious' : 'normal'
    };
    
    events.unshift(newEvent);
    
    // Keep only last 50 events
    if (events.length > 50) {
        events = events.slice(0, 50);
    }
    
    updateActivityFeed();
}

function getRandomEventType() {
    const types = ['HTTP', 'HTTPS', 'SSH', 'FTP', 'DNS', 'SMTP', 'TELNET'];
    return types[Math.floor(Math.random() * types.length)];
}

function getRandomIP(type = 'external') {
    if (type === 'internal') {
        return `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
    } else {
        return `10.0.0.${Math.floor(Math.random() * 254) + 1}`;
    }
}

function updateActivityFeed() {
    const feed = document.getElementById('activity-feed');
    const noActivity = document.getElementById('no-activity');
    
    if (events.length === 0) {
        feed.innerHTML = '';
        noActivity.style.display = 'block';
        return;
    }
    
    noActivity.style.display = 'none';
    
    feed.innerHTML = events.map(event => `
        <tr class="border-b border-border hover:bg-card-hover transition-colors">
            <td class="p-3 text-sm font-mono">${event.timestamp}</td>
            <td class="p-3 text-sm">${event.type}</td>
            <td class="p-3 text-sm font-mono">${event.source}</td>
            <td class="p-3 text-sm font-mono">${event.destination}</td>
            <td class="p-3 text-sm">${event.protocol}</td>
            <td class="p-3">
                <span class="badge ${getStatusBadgeClass(event.status)}">
                    ${event.status.toUpperCase()}
                </span>
            </td>
        </tr>
    `).join('');
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'malicious':
            return 'badge-critical';
        case 'suspicious':
            return 'badge-warning';
        default:
            return 'badge-success';
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (monitoringInterval) {
        clearInterval(monitoringInterval);
    }
});
