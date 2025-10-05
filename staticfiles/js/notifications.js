// Notification system for OpenChat

class NotificationManager {
    constructor() {
        this.permission = null;
        this.init();
    }

    init() {
        this.requestPermission();
        this.setupServiceWorker();
    }

    // Request notification permission
    async requestPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            return;
        }

        try {
            this.permission = await Notification.requestPermission();
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    }

    // Setup service worker for push notifications
    async setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('ServiceWorker registered successfully');
            } catch (error) {
                console.error('ServiceWorker registration failed:', error);
            }
        }
    }

    // Show local notification
    showLocalNotification(title, options = {}) {
        if (this.permission !== 'granted') return;

        const defaultOptions = {
            icon: '/static/images/logo.png',
            badge: '/static/images/badge.png',
            vibrate: [200, 100, 200],
            data: {
                url: window.location.href
            }
        };

        const notification = new Notification(title, { ...defaultOptions, ...options });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };

        // Auto close after 5 seconds
        setTimeout(() => {
            notification.close();
        }, 5000);

        return notification;
    }

    // Show message notification
    showMessageNotification(username, message, roomName) {
        if (document.hasFocus()) return; // Don't show if tab is active

        this.showLocalNotification(`${username} dans ${roomName}`, {
            body: message,
            icon: '/static/images/message-icon.png',
            tag: 'new-message'
        });
    }

    // Show user joined notification
    showUserJoinedNotification(username, roomName) {
        this.showLocalNotification('Nouvel utilisateur', {
            body: `${username} a rejoint ${roomName}`,
            icon: '/static/images/user-join.png'
        });
    }

    // Show user left notification
    showUserLeftNotification(username, roomName) {
        this.showLocalNotification('Utilisateur parti', {
            body: `${username} a quitté ${roomName}`,
            icon: '/static/images/user-left.png'
        });
    }

    // Show typing notification in UI
    showTypingNotification(usernames) {
        const typingIndicator = document.getElementById('typing-indicator');
        const typingUsers = document.getElementById('typing-users');

        if (!typingIndicator || !typingUsers) return;

        if (usernames.length > 0) {
            const text = usernames.length === 1 
                ? `${usernames[0]} est en train d'écrire`
                : `${usernames.join(', ')} sont en train d'écrire`;
            
            typingUsers.textContent = text;
            typingIndicator.classList.remove('hidden');
        } else {
            typingIndicator.classList.add('hidden');
        }
    }

    // Play notification sound
    playNotificationSound(type = 'message') {
        const audio = new Audio(`/static/sounds/${type}.mp3`);
        audio.volume = 0.3;
        
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }

    // Vibrate device (if supported)
    vibrateDevice(pattern = [200, 100, 200]) {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    }

    // Show in-app notification
    showInAppNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm notification-slide-in ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-blue-500 text-white'
        }`;

        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <i class="fas ${
                        type === 'success' ? 'fa-check-circle' :
                        type === 'error' ? 'fa-exclamation-circle' :
                        type === 'warning' ? 'fa-exclamation-triangle' :
                        'fa-info-circle'
                    }"></i>
                    <span>${message}</span>
                </div>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize notification manager
const notificationManager = new NotificationManager();