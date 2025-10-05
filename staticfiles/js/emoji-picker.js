// Système d'émojis avancé pour OpenChat
class EmojiPicker {
    constructor() {
        this.emojiCategories = {
            'smileys': '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠',
            'people': '👋 🤚 🖐️ ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻 👃 🧠 🦷 🦴 👀 👁️ 👅 👄 💋 🩸',
            'animals': '🐵 🐒 🦍 🦧 🐶 🐕 🦮 🐕‍🦺 🐩 🐺 🦊 🦝 🐱 🐈 🐈‍⬛ 🦁 🐯 🐅 🐆 🐴 🐎 🦄 🦓 🦌 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿️ 🦫 🦔 🦇 🐻 🐻‍❄️ 🐨 🐼 🦥 🦦 🦨 🦘 🦡 🐾 🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧 🕊️ 🦅 🦆 🦢 🦉 🦩 🦚 🦜 🐸 🐊 🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋 🐬 🦭 🐟 🐠 🐡 🦈 🐙 🐚 🐌 🦋 🐛 🐜 🐝 🪲 🐞 🦗 🕷️ 🕸️ 🦂 🦟 🪳 🦠',
            'food': '🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶️ 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🫔 🥗 🥘 🫕 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🫖 ☕ 🍵 🧃 🥤 🧋 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🧉 🍾 🧊 🥄 🍴 🍽️ 🥣 🥡 🥢',
            'activities': '⚽ 🏀 🏈 ⚾ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓 🏸 🏒 🏑 🥍 🏏 🪁 🎣 🤿 🥊 🥋 🎽 🛹 🛼 🛷 ⛸️ 🥌 🎿 ⛷️ 🏂 🪂 🏋️‍♀️ 🏋️‍♂️ 🤼‍♀️ 🤼‍♂️ 🤸‍♀️ 🤸‍♂️ ⛹️‍♀️ ⛹️‍♂️ 🤺 🤾‍♀️ 🤾‍♂️ 🏌️‍♀️ 🏌️‍♂️ 🏇 🧘‍♀️ 🧘‍♂️ 🏄‍♀️ 🏄‍♂️ 🏊‍♀️ 🏊‍♂️ 🤽‍♀️ 🤽‍♂️ 🚣‍♀️ 🚣‍♂️ 🧗‍♀️ 🧗‍♂️ 🚵‍♀️ 🚵‍♂️ 🚴‍♀️ 🚴‍♂️ 🏆 🥇 🥈 🥉 🏅 🎖️ 🏅 🎗️ 🎫 🎟️ 🎪 🤹‍♀️ 🤹‍♂️ 🎭 🩰 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🪘 🎷 🎺 🪗 🎸 🪕 🎻 🎲 ♟️ 🎯 🎳 🎮 🎰 🧩',
            'travel': '🚗 🚕 🚙 🚌 🚎 🏎️ 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🦯 🦽 🦼 🛴 🚲 🛵 🏍️ 🛺 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 🚉 ✈️ 🛫 🛬 🛩️ 💺 🛰️ 🚀 🛸 🚁 🛶 ⛵ 🚤 🛥️ 🛳️ ⛴️ 🚢 ⚓ 🪝 ⛽ 🚧 🚦 🚥 🚏 🗺️ 🗿 🗽 🗼 🏰 🏯 🏟️ 🎡 🎢 🎠 ⛲ 🌅 🌄 🌠 🎇 🎆 🌇 🌆 🏙️ 🌃 🌌 🌉 🌁',
            'objects': '⌚ 📱 📲 💻 ⌨️ 🖥️ 🖨️ 🖱️ 🖲️ 🕹️ 🗜️ 💽 💾 💿 📀 📼 📷 📸 📹 🎥 📽️ 🎞️ 📞 ☎️ 📟 📠 📺 📻 🎙️ 🎚️ 🎛️ 🧭 ⏱️ ⏲️ ⏰ 🕰️ ⌛ ⏳ 📡 🔋 🔌 💡 🔦 🕯️ 🪔 🧯 🛢️ 💸 💵 💴 💶 💷 🪙 💰 💳 🪪 💎 ⚖️ 🪜 🧰 🪛 🔨 🪚 🔧 🪓 ⛏️ ⚒️ 🛠️ 🗡️ ⚔️ 🔫 🪃 🏹 🛡️ 🪚 🔧 🪓 🔩 ⚙️ 🪤 🧱 ⛓️ 🧲 🔫 💣 🧨 🪓 📿 🕶️ 🔎 🩺',
            'symbols': '❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ☮️ ✝️ ☪️ 🕉️ ☸️ ✡️ 🔯 🕎 ☯️ ☦️ 🛐 ⛎ ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ 🆔 ⚛️ 🉑 ☢️ ☣️ 📴 📳 🈶 🈚 🈸 🈺 🈷️ ✴️ 🆚 💮 🉐 ㊙️ ㊗️ 🈴 🈵 🈹 🈲 🅰️ 🅱️ 🆎 🆑 🅾️ 🆘 ❌ ⭕ 🛑 ⛔ 📛 🚫 💯 💢 ♨️ 🚷 🚯 🚳 🚱 🔞 📵 🚭 ❗ ❕ ❓ ❔ ‼️ ⁉️ 🔅 🔆 〽️ ⚠️ 🚸 🔱 ⚜️ 🔰 ♻️ ✅ 🈯 💹 ❇️ ✳️ ❎ 🌐 💠 Ⓜ️ 🌀 💤 🏧 🚾 ♿ 🅿️ 🛗 🈳 🈂️ 🛂 🛃 🛄 🛅 🚹 🚺 🚼 ⚧ 🚻 🚮 🎦 📶 🈁 🔣 ℹ️ 🔤 🔡 🔠 🆖 🆗 🆙 🆒 🆕 🆓 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔢 #️⃣ *️⃣ ⏏️ ▶️ ⏸️ ⏯️ ⏹️ ⏺️ ⏭️ ⏮️ ⏩ ⏪ ⏫ ⏬ ◀️ 🔼 🔽 ➡️ ⬅️ ⬆️ ⬇️ ↗️ ↘️ ↙️ ↖️ ↕️ ↔️ ↪️ ↩️ ⤴️ ⤵️ 🔀 🔁 🔂 🔄 🔃 🎵 🎶 ➕ ➖ ➗ ✖️ ♾️ 💲 💱 ™️ ©️ ®️ 〰️ ➰ ➿ 🔚 🔙 🔛 🔝 🔜'
        };
        this.frequentlyUsed = JSON.parse(localStorage.getItem('frequentlyUsedEmojis') || '[]');
        this.init();
    }

    init() {
        this.createPickerElement();
        this.setupEventListeners();
    }

    createPickerElement() {
        this.picker = document.createElement('div');
        this.picker.className = 'emoji-picker hidden absolute bottom-16 right-4 bg-white border border-gray-300 rounded-lg shadow-2xl z-50 w-80 max-h-96 overflow-hidden';
        this.picker.innerHTML = this.getPickerHTML();
        document.body.appendChild(this.picker);
    }

    getPickerHTML() {
        return `
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="flex border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <input type="text" id="emoji-search" placeholder="Rechercher un émoji..." 
                           class="flex-1 px-3 py-2 bg-transparent border-0 focus:ring-0 text-sm">
                    <button class="px-3 py-2 text-gray-500 hover:text-gray-700" onclick="emojiPicker.togglePicker()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Categories -->
                <div class="flex border-b border-gray-200 overflow-x-auto bg-white">
                    ${Object.keys(this.emojiCategories).map(category => `
                        <button class="emoji-category px-3 py-2 text-sm hover:bg-gray-100 border-b-2 border-transparent data-[active=true]:border-indigo-500 data-[active=true]:text-indigo-600"
                                data-category="${category}">
                            ${this.getCategoryIcon(category)}
                        </button>
                    `).join('')}
                </div>

                <!-- Emoji Grid -->
                <div class="flex-1 overflow-y-auto custom-scrollbar p-2" id="emoji-grid">
                    ${this.renderEmojiGrid('smileys')}
                </div>

                <!-- Frequently Used -->
                <div class="border-t border-gray-200 p-2 bg-gray-50" id="frequent-emojis">
                    <div class="text-xs text-gray-500 mb-1">Utilisés fréquemment</div>
                    <div class="flex flex-wrap">
                        ${this.renderFrequentlyUsed()}
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            'smileys': '😀',
            'people': '👋',
            'animals': '🐵',
            'food': '🍎',
            'activities': '⚽',
            'travel': '🚗',
            'objects': '⌚',
            'symbols': '❤️'
        };
        return icons[category] || '❓';
    }

    renderEmojiGrid(category) {
        const emojis = this.emojiCategories[category].split(' ').filter(e => e.trim());
        return `
            <div class="grid grid-cols-8 gap-1">
                ${emojis.map(emoji => `
                    <button class="emoji-item w-8 h-8 text-lg hover:bg-gray-100 rounded transition duration-150 transform hover:scale-110"
                            data-emoji="${emoji}"
                            onclick="emojiPicker.selectEmoji('${emoji}')">
                        ${emoji}
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderFrequentlyUsed() {
        if (this.frequentlyUsed.length === 0) {
            return '<div class="text-xs text-gray-400">Aucun émoji utilisé récemment</div>';
        }
        
        return this.frequentlyUsed.slice(0, 24).map(emoji => `
            <button class="emoji-item w-6 h-6 text-sm hover:bg-gray-100 rounded m-0.5"
                    data-emoji="${emoji}"
                    onclick="emojiPicker.selectEmoji('${emoji}')">
                ${emoji}
            </button>
        `).join('');
    }

    setupEventListeners() {
        // Recherche d'émojis
        document.addEventListener('input', (e) => {
            if (e.target.id === 'emoji-search') {
                this.searchEmojis(e.target.value);
            }
        });

        // Changement de catégorie
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-category')) {
                const category = e.target.dataset.category;
                this.showCategory(category);
            }
        });

        // Fermer le picker en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!this.picker.contains(e.target) && !e.target.closest('.emoji-toggle')) {
                this.hidePicker();
            }
        });
    }

    searchEmojis(query) {
        if (!query.trim()) {
            this.showCategory('smileys');
            return;
        }

        const allEmojis = Object.values(this.emojiCategories).join(' ').split(' ').filter(e => e.trim());
        const filteredEmojis = allEmojis.filter(emoji => 
            emoji.includes(query) || this.getEmojiName(emoji).includes(query.toLowerCase())
        );

        const grid = document.getElementById('emoji-grid');
        grid.innerHTML = `
            <div class="grid grid-cols-8 gap-1">
                ${filteredEmojis.slice(0, 64).map(emoji => `
                    <button class="emoji-item w-8 h-8 text-lg hover:bg-gray-100 rounded transition duration-150 transform hover:scale-110"
                            data-emoji="${emoji}"
                            onclick="emojiPicker.selectEmoji('${emoji}')">
                        ${emoji}
                    </button>
                `).join('')}
            </div>
        `;
    }

    getEmojiName(emoji) {
        // Cette fonction pourrait être étendue avec une base de données de noms d'émojis
        const names = {
            '😀': 'visage souriant',
            '😂': 'pleure de rire',
            '❤️': 'coeur rouge',
            '🔥': 'feu',
            '⭐': 'étoile',
            // Ajouter plus de mappings...
        };
        return names[emoji] || emoji;
    }

    showCategory(category) {
        const grid = document.getElementById('emoji-grid');
        grid.innerHTML = this.renderEmojiGrid(category);
        
        // Mettre à jour les catégories actives
        document.querySelectorAll('.emoji-category').forEach(btn => {
            btn.dataset.active = (btn.dataset.category === category).toString();
        });
    }

    selectEmoji(emoji) {
        this.addToFrequentlyUsed(emoji);
        
        // Insérer l'émoji dans le champ de message
        const input = document.getElementById('chat-input');
        if (input) {
            const cursorPos = input.selectionStart;
            const textBefore = input.value.substring(0, cursorPos);
            const textAfter = input.value.substring(cursorPos);
            input.value = textBefore + emoji + textAfter;
            input.focus();
            input.selectionStart = input.selectionEnd = cursorPos + emoji.length;
            
            // Déclencher l'événement input pour la détection de frappe
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }

        this.hidePicker();
    }

    addToFrequentlyUsed(emoji) {
        this.frequentlyUsed = this.frequentlyUsed.filter(e => e !== emoji);
        this.frequentlyUsed.unshift(emoji);
        
        if (this.frequentlyUsed.length > 30) {
            this.frequentlyUsed = this.frequentlyUsed.slice(0, 30);
        }
        
        localStorage.setItem('frequentlyUsedEmojis', JSON.stringify(this.frequentlyUsed));
        this.updateFrequentlyUsedDisplay();
    }

    updateFrequentlyUsedDisplay() {
        const frequentContainer = document.getElementById('frequent-emojis');
        if (frequentContainer) {
            frequentContainer.querySelector('div:last-child').innerHTML = this.renderFrequentlyUsed();
        }
    }

    togglePicker() {
        if (this.picker.classList.contains('hidden')) {
            this.showPicker();
        } else {
            this.hidePicker();
        }
    }

    showPicker() {
        this.picker.classList.remove('hidden');
        document.getElementById('emoji-search').focus();
    }

    hidePicker() {
        this.picker.classList.add('hidden');
        const search = document.getElementById('emoji-search');
        if (search) search.value = '';
    }
}

// Initialiser le picker d'émojis
const emojiPicker = new EmojiPicker();