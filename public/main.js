// Main JavaScript for IDS Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Sidebar functionality
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    let sidebarCollapsed = false;
    
    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            // Mobile: slide in/out
            sidebar.classList.toggle('open');
        } else {
            // Desktop: collapse/expand
            sidebarCollapsed = !sidebarCollapsed;
            sidebar.classList.toggle('collapsed', sidebarCollapsed);
            mainContent.classList.toggle('sidebar-collapsed', sidebarCollapsed);
            
            if (sidebarCollapsed) {
                mainContent.style.marginLeft = '4rem';
            } else {
                mainContent.style.marginLeft = '16rem';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('sidebar-collapsed');
            mainContent.style.marginLeft = '0';
        } else {
            sidebar.classList.remove('open');
            if (!sidebarCollapsed) {
                mainContent.style.marginLeft = '16rem';
            }
        }
    });
    
    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target) &&
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });
    
    // Navigation highlighting
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = getCurrentPage();
    
    navItems.forEach(item => {
        const page = item.getAttribute('data-page');
        if (page === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Simulate real-time updates for dashboard
    if (currentPage === 'dashboard') {
        startDashboardUpdates();
    }
    
    // Initialize page-specific functionality
    initPageFunctionality();
});

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page || 'dashboard';
}

function startDashboardUpdates() {
    // Simulate real-time data updates
    setInterval(() => {
        updateDashboardStats();
    }, 5000);
}

function updateDashboardStats() {
    // Update bandwidth usage
    const bandwidthBar = document.querySelector('.bg-primary');
    if (bandwidthBar) {
        const newWidth = Math.floor(Math.random() * 30) + 50; // 50-80%
        bandwidthBar.style.width = newWidth + '%';
        bandwidthBar.parentElement.previousElementSibling.querySelector('span:last-child').textContent = newWidth + '%';
    }
    
    // Update active connections
    const connectionsElement = document.querySelector('.text-primary');
    if (connectionsElement && connectionsElement.textContent.includes(',')) {
        const newConnections = Math.floor(Math.random() * 500) + 1000;
        connectionsElement.textContent = newConnections.toLocaleString();
    }
}

function initPageFunctionality() {
    const currentPage = getCurrentPage();
    
    switch (currentPage) {
        case 'monitoring':
            initMonitoring();
            break;
        case 'alerts':
            initAlerts();
            break;
        case 'network':
            initNetwork();
            break;
        case 'threats':
            initThreats();
            break;
        case 'logs':
            initLogs();
            break;
        case 'settings':
            initSettings();
            break;
    }
}

function initMonitoring() {
    // Real-time monitoring functionality would go here
    console.log('Monitoring page initialized');
}

function initAlerts() {
    // Alerts management functionality would go here
    console.log('Alerts page initialized');
}

function initNetwork() {
    // Network analysis functionality would go here
    console.log('Network page initialized');
}

function initThreats() {
    // Threat intelligence functionality would go here
    console.log('Threats page initialized');
}

function initLogs() {
    // Logs management functionality would go here
    console.log('Logs page initialized');
}

function initSettings() {
    // Settings functionality would go here
    console.log('Settings page initialized');
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 p-4 rounded-lg border z-50 animate-slide-up ${getNotificationClasses(type)}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i data-lucide="${getNotificationIcon(type)}" class="w-5 h-5"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function getNotificationClasses(type) {
    switch (type) {
        case 'success':
            return 'bg-success/10 border-success/20 text-success';
        case 'warning':
            return 'bg-warning/10 border-warning/20 text-warning';
        case 'error':
            return 'bg-critical/10 border-critical/20 text-critical';
        default:
            return 'bg-info/10 border-info/20 text-info';
    }
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'check-circle';
        case 'warning':
            return 'alert-triangle';
        case 'error':
            return 'x-circle';
        default:
            return 'info';
    }
}

// Example of how to use the notification system
// showNotification('Security scan completed successfully', 'success');