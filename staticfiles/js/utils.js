// Utility functions for OpenChat

class ChatUtils {
    // Escape HTML to prevent XSS
    static escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Format timestamp
    static formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Format date
    static formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    // Check if message is from today
    static isToday(timestamp) {
        const today = new Date();
        const messageDate = new Date(timestamp);
        return today.toDateString() === messageDate.toDateString();
    }

    // Debounce function
    static debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Generate random color for avatar
    static generateAvatarColor(username) {
        const colors = [
            'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
            'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
        ];
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    // Get user initials
    static getUserInitials(username) {
        return username.charAt(0).toUpperCase();
    }

    // Check if user is scrolling up
    static isScrollingUp(container) {
        if (!container.previousScrollTop) {
            container.previousScrollTop = container.scrollTop;
            return false;
        }
        
        const scrollingUp = container.scrollTop < container.previousScrollTop;
        container.previousScrollTop = container.scrollTop;
        return scrollingUp;
    }

    // Auto-resize textarea
    static autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    // Copy text to clipboard
    static copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Texte copié !', 'success');
        }).catch(err => {
            console.error('Erreur de copie:', err);
        });
    }

    // Show notification
    static showNotification(message, type = 'info') {
        // Implementation for showing notifications
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 notification-slide-in ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Validate email
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Get browser info
    static getBrowserInfo() {
        const ua = navigator.userAgent;
        let browserName;
        let browserVersion;
        
        if (ua.includes("Chrome") && !ua.includes("Edg")) {
            browserName = "Chrome";
            browserVersion = ua.match(/Chrome\/([0-9.]+)/)[1];
        } else if (ua.includes("Firefox")) {
            browserName = "Firefox";
            browserVersion = ua.match(/Firefox\/([0-9.]+)/)[1];
        } else if (ua.includes("Safari") && !ua.includes("Chrome")) {
            browserName = "Safari";
            browserVersion = ua.match(/Version\/([0-9.]+)/)[1];
        } else if (ua.includes("Edg")) {
            browserName = "Edge";
            browserVersion = ua.match(/Edg\/([0-9.]+)/)[1];
        } else {
            browserName = "Unknown";
            browserVersion = "Unknown";
        }
        
        return { name: browserName, version: browserVersion };
    }

    // Check mobile device
    static isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Format file size
    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Generate unique ID
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Check if element is in viewport
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Smooth scroll to element
    static smoothScrollTo(element, duration = 300) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ChatUtils.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Easing function
    static easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatUtils;
}