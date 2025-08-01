// Settings page specific JavaScript
let currentSettings = {
    general: {
        systemName: 'CyberGuard IDS',
        timezone: 'UTC',
        language: 'English',
        theme: 'Dark',
        autoRefresh: true,
        refreshInterval: 30
    },
    security: {
        threatLevel: 'medium',
        autoBlock: true,
        quarantine: true,
        scanInterval: 60,
        passwordPolicy: 'strong',
        sessionTimeout: 30
    },
    notifications: {
        emailAlerts: true,
        smsAlerts: false,
        pushNotifications: true,
        alertLevel: 'high',
        emailAddress: 'admin@company.com',
        phoneNumber: '+1-555-0123'
    },
    users: {
        maxUsers: 50,
        requireMFA: true,
        passwordExpiry: 90,
        lockoutThreshold: 5,
        lockoutDuration: 15
    },
    backup: {
        autoBackup: true,
        backupInterval: 'daily',
        retentionPeriod: 30,
        backupLocation: '/backup/ids',
        compression: true
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initSettingsPage();
});

function initSettingsPage() {
    // Add click handlers for navigation
    const navItems = document.querySelectorAll('.settings-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Add save handler
    document.getElementById('save-settings').addEventListener('click', saveSettings);
    
    // Load initial section
    switchSection('general');
}

function switchSection(section) {
    // Update navigation
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Update title
    const titles = {
        general: 'General Settings',
        security: 'Security Policy',
        notifications: 'Notification Settings',
        users: 'User Management',
        backup: 'Backup & Recovery'
    };
    document.getElementById('settings-title').textContent = titles[section];
    
    // Update content
    const content = getSettingsContent(section);
    document.getElementById('settings-content').innerHTML = content;
    
    // Re-initialize icons
    lucide.createIcons();
}

function getSettingsContent(section) {
    switch (section) {
        case 'general':
            return `
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium mb-2">System Name</label>
                        <input type="text" value="${currentSettings.general.systemName}" 
                               class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Timezone</label>
                            <select class="w-full px-3 py-2 border border-border rounded bg-background text-foreground">
                                <option value="UTC" ${currentSettings.general.timezone === 'UTC' ? 'selected' : ''}>UTC</option>
                                <option value="EST" ${currentSettings.general.timezone === 'EST' ? 'selected' : ''}>EST</option>
                                <option value="PST" ${currentSettings.general.timezone === 'PST' ? 'selected' : ''}>PST</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Language</label>
                            <select class="w-full px-3 py-2 border border-border rounded bg-background text-foreground">
                                <option value="English" selected>English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">Auto Refresh Dashboard</label>
                            <input type="checkbox" ${currentSettings.general.autoRefresh ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Refresh Interval (seconds)</label>
                            <input type="number" value="${currentSettings.general.refreshInterval}" min="10" max="300"
                                   class="w-32 px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                    </div>
                </div>
            `;
            
        case 'security':
            return `
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium mb-2">Default Threat Response Level</label>
                        <select class="w-full px-3 py-2 border border-border rounded bg-background text-foreground">
                            <option value="low" ${currentSettings.security.threatLevel === 'low' ? 'selected' : ''}>Low - Log Only</option>
                            <option value="medium" ${currentSettings.security.threatLevel === 'medium' ? 'selected' : ''}>Medium - Alert & Log</option>
                            <option value="high" ${currentSettings.security.threatLevel === 'high' ? 'selected' : ''}>High - Block & Alert</option>
                        </select>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">Auto-block Malicious IPs</label>
                            <input type="checkbox" ${currentSettings.security.autoBlock ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">Auto-quarantine Infected Files</label>
                            <input type="checkbox" ${currentSettings.security.quarantine ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Scan Interval (minutes)</label>
                            <input type="number" value="${currentSettings.security.scanInterval}" min="5" max="1440"
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                            <input type="number" value="${currentSettings.security.sessionTimeout}" min="5" max="480"
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                    </div>
                </div>
            `;
            
        case 'notifications':
            return `
                <div class="space-y-6">
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">Email Alerts</label>
                            <input type="checkbox" ${currentSettings.notifications.emailAlerts ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">SMS Alerts</label>
                            <input type="checkbox" ${currentSettings.notifications.smsAlerts ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">Push Notifications</label>
                            <input type="checkbox" ${currentSettings.notifications.pushNotifications ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Minimum Alert Level</label>
                        <select class="w-full px-3 py-2 border border-border rounded bg-background text-foreground">
                            <option value="low" ${currentSettings.notifications.alertLevel === 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" ${currentSettings.notifications.alertLevel === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" ${currentSettings.notifications.alertLevel === 'high' ? 'selected' : ''}>High</option>
                            <option value="critical" ${currentSettings.notifications.alertLevel === 'critical' ? 'selected' : ''}>Critical Only</option>
                        </select>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Email Address</label>
                            <input type="email" value="${currentSettings.notifications.emailAddress}" 
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Phone Number</label>
                            <input type="tel" value="${currentSettings.notifications.phoneNumber}" 
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                    </div>
                </div>
            `;
            
        case 'users':
            return `
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Maximum Users</label>
                            <input type="number" value="${currentSettings.users.maxUsers}" min="1" max="1000"
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Password Expiry (days)</label>
                            <input type="number" value="${currentSettings.users.passwordExpiry}" min="30" max="365"
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">Require Multi-Factor Authentication</label>
                            <input type="checkbox" ${currentSettings.users.requireMFA ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Lockout Threshold (attempts)</label>
                            <input type="number" value="${currentSettings.users.lockoutThreshold}" min="3" max="10"
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Lockout Duration (minutes)</label>
                            <input type="number" value="${currentSettings.users.lockoutDuration}" min="5" max="60"
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                    </div>
                </div>
            `;
            
        case 'backup':
            return `
                <div class="space-y-6">
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">Enable Automatic Backup</label>
                            <input type="checkbox" ${currentSettings.backup.autoBackup ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <label class="text-sm font-medium">Enable Compression</label>
                            <input type="checkbox" ${currentSettings.backup.compression ? 'checked' : ''} 
                                   class="w-4 h-4 text-primary bg-background border-border rounded" />
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Backup Interval</label>
                            <select class="w-full px-3 py-2 border border-border rounded bg-background text-foreground">
                                <option value="hourly" ${currentSettings.backup.backupInterval === 'hourly' ? 'selected' : ''}>Hourly</option>
                                <option value="daily" ${currentSettings.backup.backupInterval === 'daily' ? 'selected' : ''}>Daily</option>
                                <option value="weekly" ${currentSettings.backup.backupInterval === 'weekly' ? 'selected' : ''}>Weekly</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Retention Period (days)</label>
                            <input type="number" value="${currentSettings.backup.retentionPeriod}" min="7" max="365"
                                   class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Backup Location</label>
                        <input type="text" value="${currentSettings.backup.backupLocation}" 
                               class="w-full px-3 py-2 border border-border rounded bg-background text-foreground" />
                    </div>
                    
                    <div class="flex space-x-2 pt-4">
                        <button class="px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg transition-colors">
                            <i data-lucide="play" class="w-4 h-4 inline mr-1"></i>
                            Start Backup Now
                        </button>
                        <button class="px-4 py-2 border border-border hover:bg-muted rounded-lg transition-colors">
                            <i data-lucide="download" class="w-4 h-4 inline mr-1"></i>
                            Restore from Backup
                        </button>
                    </div>
                </div>
            `;
            
        default:
            return '<div class="text-center text-muted-foreground py-8">Settings section not found.</div>';
    }
}

function saveSettings() {
    // In a real application, this would send the settings to a server
    showNotification('Settings saved successfully', 'success');
}

// Initialize Lucide icons when the page loads
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});