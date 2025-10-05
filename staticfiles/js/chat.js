// Système de chat temps réel ultra sophistiqué avec émojis
class OpenChat {
    constructor() {
        this.socket = null;
        this.typing = false;
        this.typingTimer = null;
        this.typingUsers = new Set();
        this.emojiPicker = null;
        this.messageCount = 0;
        this.init();
    }

    init() {
        this.connectWebSocket();
        this.setupEventListeners();
        this.setupEmojiPicker();
        this.loadPreviousMessages();
        this.setupNotifications();
    }

    connectWebSocket() {
        this.socket = new WebSocket(
            'ws://' + window.location.host + '/ws/chat/' + roomName + '/'
        );

        this.socket.onopen = (e) => {
            console.log('✅ WebSocket connecté avec succès');
            this.showNotification('Connecté au chat', 'success');
        };

        this.socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.handleMessage(data);
        };

        this.socket.onclose = (e) => {
            console.log('🔌 WebSocket déconnecté, tentative de reconnexion...');
            this.showNotification('Connexion perdue, reconnexion...', 'warning');
            setTimeout(() => this.connectWebSocket(), 3000);
        };

        this.socket.onerror = (e) => {
            console.error('❌ Erreur WebSocket:', e);
            this.showNotification('Erreur de connexion', 'error');
        };
    }

    handleMessage(data) {
        switch (data.type) {
            case 'chat_message':
                this.displayMessage(data);
                this.playNotificationSound('message');
                break;
            case 'user_typing':
                this.handleTypingIndicator(data);
                break;
            case 'online_users':
                this.updateOnlineUsers(data.users);
                break;
        }
    }

    displayMessage(data) {
        const messagesContainer = document.getElementById('chat-messages');
        const noMessages = document.getElementById('no-messages');
        
        // Masquer "Aucun message"
        if (noMessages) {
            noMessages.style.display = 'none';
        }

        const messageElement = this.createMessageElement(data);
        messagesContainer.appendChild(messageElement);
        
        // Scroll smooth vers le bas
        this.scrollToBottom(messagesContainer);
        
        // Animation d'entrée
        this.animateMessage(messageElement);
        
        // Notification pour les nouveaux messages
        if (data.user !== currentUser) {
            this.showMessageNotification(data.user, data.message);
        }

        this.messageCount++;
    }

    createMessageElement(data) {
        const isCurrentUser = data.user === currentUser;
        const messageId = `message-${data.message_id || Date.now()}`;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-element flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`;
        messageDiv.id = messageId;
        messageDiv.setAttribute('data-message-id', data.message_id || '');
        
        messageDiv.innerHTML = `
            <div class="flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-xs lg:max-w-md">
                <!-- Avatar -->
                <div class="flex-shrink-0">
                    <div class="w-8 h-8 ${this.getUserColor(data.user)} rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                        ${this.getUserInitials(data.user)}
                    </div>
                </div>
                
                <!-- Message -->
                <div class="flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}">
                    <!-- Nom d'utilisateur (seulement pour les autres) -->
                    ${!isCurrentUser ? `
                        <span class="text-xs text-gray-500 mb-1 font-medium">${this.escapeHtml(data.user)}</span>
                    ` : ''}
                    
                    <!-- Contenu du message -->
                    <div class="px-4 py-2 rounded-2xl ${isCurrentUser ? 
                        'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none shadow-lg' : 
                        'bg-white text-gray-800 rounded-bl-none border border-gray-200 shadow-sm'
                    }">
                        <p class="text-sm whitespace-pre-wrap break-words emoji-text">${this.parseEmojis(this.escapeHtml(data.message))}</p>
                    </div>
                    
                    <!-- Timestamp -->
                    <span class="text-xs text-gray-400 mt-1 flex items-center space-x-1">
                        <i class="fas fa-clock text-xs"></i>
                        <span>${this.formatTime(data.timestamp)}</span>
                        ${isCurrentUser ? '<i class="fas fa-check text-blue-500"></i>' : ''}
                    </span>
                </div>
            </div>
        `;

        return messageDiv;
    }

    parseEmojis(text) {
        // Support basique des émojis - peut être étendu
        return text;
    }

    animateMessage(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) scale(0.95)';
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        });
    }

    scrollToBottom(container) {
        const isAtBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 100;
        
        if (isAtBottom) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    handleTypingIndicator(data) {
        if (data.typing && data.user !== currentUser) {
            this.typingUsers.add(data.user);
        } else {
            this.typingUsers.delete(data.user);
        }

        this.updateTypingDisplay();
    }

    updateTypingDisplay() {
        const indicator = document.getElementById('typing-indicator');
        const typingUsers = document.getElementById('typing-users');
        
        if (!indicator || !typingUsers) return;

        const users = Array.from(this.typingUsers);
        
        if (users.length > 0) {
            const text = users.length === 1 
                ? `${users[0]} est en train d'écrire`
                : `${users.slice(0, 2).join(', ')} ${users.length > 2 ? `et ${users.length - 2} autre(s)` : ''} sont en train d'écrire`;
            
            typingUsers.textContent = text;
            indicator.classList.remove('hidden');
        } else {
            indicator.classList.add('hidden');
        }
    }

    updateOnlineUsers(users) {
        const onlineUsersContainer = document.getElementById('online-users');
        const onlineCount = document.getElementById('online-count');
        
        if (!onlineUsersContainer || !onlineCount) return;

        onlineCount.textContent = users.length;
        onlineCount.classList.add('pulse-gentle');
        setTimeout(() => onlineCount.classList.remove('pulse-gentle'), 1000);
        
        onlineUsersContainer.innerHTML = users.map(user => `
            <div class="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
                <div class="relative">
                    <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div class="flex-1 min-w-0">
                    <span class="text-sm font-medium text-gray-700 truncate">${this.escapeHtml(user)}</span>
                    ${user === currentUser ? '<span class="text-xs text-gray-500">(Vous)</span>' : ''}
                </div>
                <div class="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        const form = document.getElementById('chat-form');
        const input = document.getElementById('chat-input');

        // Soumission du formulaire
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        // Détection de frappe
        input.addEventListener('input', this.handleTyping.bind(this));

        // Touche Entrée pour envoyer (Shift+Enter pour nouvelle ligne)
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Focus/Blur pour les indicateurs
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('ring-2', 'ring-indigo-500', 'ring-opacity-50');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('ring-2', 'ring-indigo-500', 'ring-opacity-50');
        });

        // Clic sur les messages (pour interactions futures)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.message-element')) {
                this.handleMessageClick(e.target.closest('.message-element'));
            }
        });
    }

    handleTyping = this.debounce(() => {
        const input = document.getElementById('chat-input');
        
        if (!this.typing && input.value.trim()) {
            this.typing = true;
            this.socket.send(JSON.stringify({
                'type': 'typing',
                'typing': true
            }));
        }

        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => {
            this.typing = false;
            this.socket.send(JSON.stringify({
                'type': 'typing',
                'typing': false
            }));
        }, 1000);
    }, 300);

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (message) {
            // Arrêter l'indicateur de frappe
            this.typing = false;
            this.socket.send(JSON.stringify({
                'type': 'typing',
                'typing': false
            }));

            // Envoyer le message
            this.socket.send(JSON.stringify({
                'type': 'chat_message',
                'message': message
            }));

            // Réinitialiser l'input
            input.value = '';
            input.style.height = 'auto';
            
            // Focus maintenu
            input.focus();
        }
    }

    setupEmojiPicker() {
        this.emojiPicker = new EmojiPicker();
        
        // Ajouter le bouton émoji dans l'interface
        const inputContainer = document.querySelector('#chat-form .flex-1');
        if (inputContainer) {
            const emojiButton = document.createElement('button');
            emojiButton.type = 'button';
            emojiButton.className = 'emoji-toggle px-4 text-gray-500 hover:text-indigo-600 transition duration-200 transform hover:scale-110';
            emojiButton.innerHTML = '<i class="fas fa-smile text-lg"></i>';
            emojiButton.title = 'Insérer un émoji';
            emojiButton.onclick = () => this.emojiPicker.togglePicker();
            
            inputContainer.parentNode.insertBefore(emojiButton, inputContainer);
        }
    }

    setupNotifications() {
        // Demander la permission pour les notifications
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    showMessageNotification(username, message) {
        // Notification navigateur
        if (Notification.permission === 'granted' && !document.hasFocus()) {
            new Notification(`${username} dans ${roomName}`, {
                body: message.length > 50 ? message.substring(0, 50) + '...' : message,
                icon: '/static/images/logo.png',
                tag: 'new-message'
            });
        }

        // Notification in-app
        this.showInAppNotification(`${username}: ${message}`, 'info');
    }

    showInAppNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm notification-slide-in ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            type === 'warning' ? 'bg-yellow-500 text-white' :
            'bg-indigo-500 text-white'
        }`;

        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <i class="fas ${
                        type === 'success' ? 'fa-check-circle' :
                        type === 'error' ? 'fa-exclamation-circle' :
                        type === 'warning' ? 'fa-exclamation-triangle' :
                        'fa-info-circle'
                    }"></i>
                    <span class="text-sm">${this.escapeHtml(message)}</span>
                </div>
                <button class="ml-4 text-white hover:text-gray-200 transition duration-200" 
                        onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove après 5 secondes
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    playNotificationSound(type = 'message') {
        // Créer un son de notification simple
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = type === 'message' ? 800 : 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    loadPreviousMessages() {
        fetch(`/chat/${roomName}/messages/`)
            .then(response => {
                if (!response.ok) throw new Error('Erreur réseau');
                return response.json();
            })
            .then(messages => {
                if (messages.length > 0) {
                    document.getElementById('no-messages').style.display = 'none';
                    messages.forEach(message => {
                        this.displayMessage(message);
                    });
                }
            })
            .catch(error => {
                console.error('Erreur lors du chargement des messages:', error);
                this.showNotification('Erreur de chargement des messages', 'error');
            });
    }

    handleMessageClick(messageElement) {
        // Animation de clic sur le message
        messageElement.style.transform = 'scale(0.98)';
        setTimeout(() => {
            messageElement.style.transform = 'scale(1)';
        }, 150);

        // Ajouter des fonctionnalités ici (réponse, réaction, etc.)
    }

    // UTILITIES
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getUserColor(username) {
        const colors = [
            'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
            'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
            'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-amber-500'
        ];
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    getUserInitials(username) {
        return username.charAt(0).toUpperCase();
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    showNotification(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

// Initialiser le chat quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier que nous sommes bien dans une salle de chat
    if (typeof roomName !== 'undefined' && typeof currentUser !== 'undefined') {
        window.chatApp = new OpenChat();
        
        // Ajouter un indicateur de connexion
        const connectionIndicator = document.createElement('div');
        connectionIndicator.className = 'fixed top-4 left-4 z-40';
        connectionIndicator.innerHTML = `
            <div class="bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span class="text-sm font-medium">Connecté</span>
            </div>
        `;
        document.body.appendChild(connectionIndicator);
    }
});

// Gérer la fermeture de la page
window.addEventListener('beforeunload', () => {
    if (window.chatApp && window.chatApp.socket) {
        window.chatApp.socket.close();
    }
});