// Main Entry Point
// The Forgotten Playroom - HTML5 Horror Game

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 The Forgotten Playroom - Starting...');
    
    // Game initialization happens in game.js
    // This file is for additional setup
    
    // Prevent context menu on right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Handle visibility change (pause when tab hidden)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && window.game && window.game.state === GAME_STATES.PLAYING) {
            window.game.pause();
        }
    });
    
    // ===========================================
    // MAIN MENU BUTTONS
    // ===========================================
    
    // JUGAR button
    document.getElementById('btn-play')?.addEventListener('click', () => {
        console.log('Play button clicked');
        hideAllMenus();
        window.game?.startNewGame();
    });
    
    // CAPÍTULOS button
    document.getElementById('btn-chapters')?.addEventListener('click', () => {
        console.log('Chapters button clicked');
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('chapters-menu').classList.remove('hidden');
    });
    
    // PERSONAJES button
    document.getElementById('btn-characters')?.addEventListener('click', () => {
        console.log('Characters button clicked');
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('characters-menu').classList.remove('hidden');
    });
    
    // CONTROLES button
    document.getElementById('btn-controls')?.addEventListener('click', () => {
        console.log('Controls button clicked');
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('controls-menu').classList.remove('hidden');
    });
    
    // CRÉDITOS button
    document.getElementById('btn-credits')?.addEventListener('click', () => {
        console.log('Credits button clicked');
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('credits-menu').classList.remove('hidden');
    });
    
    // ===========================================
    // CHAPTER SELECTION
    // ===========================================
    
    document.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', () => {
            const chapter = card.dataset.chapter;
            console.log('Chapter ' + chapter + ' selected');
            hideAllMenus();
            window.game?.loadChapter(parseInt(chapter));
            window.game?.state = GAME_STATES.PLAYING;
        });
    });
    
    document.getElementById('btn-back-chapters')?.addEventListener('click', () => {
        document.getElementById('chapters-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    });
    
    // ===========================================
    // BACK BUTTONS FOR ALL MENUS
    // ===========================================
    
    document.getElementById('btn-back-characters')?.addEventListener('click', () => {
        document.getElementById('characters-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    });
    
    document.getElementById('btn-back-controls')?.addEventListener('click', () => {
        document.getElementById('controls-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    });
    
    document.getElementById('btn-back-credits')?.addEventListener('click', () => {
        document.getElementById('credits-menu').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    });
    
    // ===========================================
    // PAUSE MENU
    // ===========================================
    
    document.getElementById('btn-resume')?.addEventListener('click', () => {
        window.game?.pause();
    });
    
    document.getElementById('btn-restart')?.addEventListener('click', () => {
        hideAllMenus();
        window.game?.startNewGame();
    });
    
    document.getElementById('btn-main-menu')?.addEventListener('click', () => {
        hideAllMenus();
        document.getElementById('main-menu').classList.remove('hidden');
        window.game?.state = GAME_STATES.MENU;
    });
    
    // ===========================================
    // GAME OVER / VICTORY SCREENS
    // ===========================================
    
    document.getElementById('btn-retry')?.addEventListener('click', () => {
        hideAllMenus();
        window.game?.startNewGame();
    });
    
    document.getElementById('btn-home')?.addEventListener('click', () => {
        hideAllMenus();
        document.getElementById('main-menu').classList.remove('hidden');
        window.game?.state = GAME_STATES.MENU;
    });
    
    // ===========================================
    // SETTINGS (if exists)
    // ===========================================
    
    document.getElementById('settings-back')?.addEventListener('click', () => {
        document.getElementById('settings-screen')?.classList.add('hidden');
    });
    
    const sfxVolume = document.getElementById('sfx-volume');
    const musicVolume = document.getElementById('music-volume');
    
    sfxVolume?.addEventListener('input', (e) => {
        if (window.game?.audio) {
            window.game.audio.setVolume('sfx', e.target.value / 100);
        }
    });
    
    musicVolume?.addEventListener('input', (e) => {
        if (window.game?.audio) {
            window.game.audio.setVolume('music', e.target.value / 100);
        }
    });
    
    document.getElementById('mute-toggle')?.addEventListener('click', () => {
        if (window.game?.audio) {
            window.game.audio.toggleMute();
            const btn = document.getElementById('mute-toggle');
            if (btn) btn.textContent = window.game.audio.muted ? '🔇' : '🔊';
        }
    });
    
    // ===========================================
    // TOUCH CONTROLS FOR MOBILE
    // ===========================================
    
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        // Only handle if game is playing
        if (!window.game || window.game.state !== GAME_STATES.PLAYING) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        const minSwipe = 30;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > minSwipe) {
                window.game.input?.simulateKey(KEYS.RIGHT);
            } else if (deltaX < -minSwipe) {
                window.game.input?.simulateKey(KEYS.LEFT);
            }
        } else {
            if (deltaY > minSwipe) {
                window.game.input?.simulateKey(KEYS.DOWN);
            } else if (deltaY < -minSwipe) {
                window.game.input?.simulateKey(KEYS.UP);
            }
        }
    });
    
    // Double tap for flashlight
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
        if (!window.game || window.game.state !== GAME_STATES.PLAYING) return;
        
        const currentTime = Date.now();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            window.game.input?.simulateKey(KEYS.F);
            e.preventDefault();
        }
        
        lastTap = currentTime;
    });
    
    // Initialize touch controls
    initTouchControls();
    
    console.log('✅ Game initialized successfully');
});

// Helper function to hide all menus
function hideAllMenus() {
    document.getElementById('main-menu')?.classList.add('hidden');
    document.getElementById('chapters-menu')?.classList.add('hidden');
    document.getElementById('characters-menu')?.classList.add('hidden');
    document.getElementById('controls-menu')?.classList.add('hidden');
    document.getElementById('credits-menu')?.classList.add('hidden');
    document.getElementById('pause-menu')?.classList.add('hidden');
    document.getElementById('game-over-screen')?.classList.add('hidden');
    document.getElementById('victory-screen')?.classList.add('hidden');
    document.getElementById('chapter-screen')?.classList.add('hidden');
}

// Mobile Touch Controls Handler
function initTouchControls() {
    console.log('📱 Initializing touch controls...');
    
    // D-Pad buttons
    document.querySelectorAll('.dpad-btn').forEach(btn => {
        const key = btn.dataset.key;
        
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (window.game && window.game.input) {
                window.game.input.keys[key] = true;
            }
        });
        
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (window.game && window.game.input) {
                window.game.input.keys[key] = false;
            }
        });
        
        btn.addEventListener('touchcancel', (e) => {
            if (window.game && window.game.input) {
                window.game.input.keys[key] = false;
            }
        });
    });
    
    // Action buttons (F, E, Space, Escape)
    document.querySelectorAll('.touch-btn').forEach(btn => {
        const key = btn.dataset.key;
        
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (window.game && window.game.input) {
                window.game.input.keys[key] = true;
                window.game.input.previousKeys[key] = false;
            }
        });
        
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (window.game && window.game.input) {
                window.game.input.keys[key] = false;
            }
        });
        
        btn.addEventListener('touchcancel', (e) => {
            if (window.game && window.game.input) {
                window.game.input.keys[key] = false;
            }
        });
    });
    
    console.log('✅ Touch controls initialized');
}

// Utility functions for mobile buttons
function simulateKeyPress(key) {
    if (window.game && window.game.input) {
        window.game.input.keys[key] = true;
        setTimeout(() => {
            window.game.input.keys[key] = false;
        }, 100);
    }
}

function togglePause() {
    if (window.game) {
        window.game.pause();
    }
}

function interact() {
    simulateKeyPress(KEYS.E);
}

function toggleFlashlight() {
    simulateKeyPress(KEYS.F);
}