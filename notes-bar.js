/**
 * Hands-On DO Sessions — Persistent Notes & Sequential Step Navigation Engine
 * Automatically injects the sticky notes bottom bar, manages cookies & localStorage,
 * and provides one-click copy buttons for single-page and all-page notes.
 */

(function () {
    const COOKIE_NAME = 'handson_notes';
    const LOCAL_KEY = 'handson_notes_backup';
    const MINIMIZED_KEY = 'handson_notes_minimized';

    const STEPS = [
        {
            id: 'index.html',
            num: '01',
            short: 'Studio & Rig',
            title: 'Studio Dashboard & Pre-Shoot Rig',
            url: 'index.html'
        },
        {
            id: 'shortcuts.html',
            num: '02',
            short: 'Shortcut Suite',
            title: 'Complete Shortcut Suite (⌥ 1–6)',
            url: 'shortcuts.html'
        },
        {
            id: 'obs-implementations.html',
            num: '03',
            short: 'OBS & Scenes',
            title: 'OBS Implementations, Scenes & Automation',
            url: 'obs-implementations.html'
        },
        {
            id: 'lighting.html',
            num: '04',
            short: 'Lighting & Dark',
            title: 'A-Roll Lighting & Darkness',
            url: 'lighting.html'
        },
        {
            id: 'hard-part.html',
            num: '05',
            short: 'The Hard Part',
            title: 'The Hard Part: Being Yourself',
            url: 'hard-part.html'
        },
        {
            id: 'courage.html',
            num: '06',
            short: 'Courage to DO',
            title: 'Courage: The Key to the Game',
            url: 'courage.html'
        },
        {
            id: 'rationale.html',
            num: '07',
            short: 'The Rationale',
            title: 'Why We DO: The Rationale',
            url: 'rationale.html'
        },
        {
            id: 'pivot.html',
            num: '08',
            short: 'The Pivot',
            title: 'The Pivot: 1-on-1s to Asynchronous Vault',
            url: 'pivot.html'
        },
        {
            id: 'cover.html',
            num: '09',
            short: 'Official Cover',
            title: 'Official Cover Artwork (1460 x 752)',
            url: 'cover.html'
        }
    ];

    // Determine current page
    function getCurrentStep() {
        const path = window.location.pathname;
        const pageName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        const found = STEPS.find(s => s.id === pageName);
        return found || STEPS[0];
    }

    // Cookie helpers
    function setCookie(name, value, days = 365) {
        try {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "; expires=" + date.toUTCString();
            document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
        } catch (e) {
            console.error("Failed to write cookie", e);
        }
    }

    function getCookie(name) {
        try {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return decodeURIComponent(parts.pop().split(';').shift());
            }
        } catch (e) {
            console.error("Failed to read cookie", e);
        }
        return '';
    }

    // Storage load & save
    function loadNotes() {
        let raw = getCookie(COOKIE_NAME);
        if (!raw) {
            raw = localStorage.getItem(LOCAL_KEY) || '{}';
        }
        try {
            return JSON.parse(raw);
        } catch (e) {
            return {};
        }
    }

    function saveNotes(notesObj) {
        const jsonStr = JSON.stringify(notesObj);
        setCookie(COOKIE_NAME, jsonStr, 365);
        try {
            localStorage.setItem(LOCAL_KEY, jsonStr);
        } catch (e) {
            // LocalStorage fallback
        }
    }

    // Toast notification
    function showToast(message) {
        let toast = document.getElementById('notes-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'notes-toast';
            toast.className = 'notes-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `✓ ${message}`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2600);
    }

    // Copy to clipboard helper
    function copyText(text, successMsg) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(successMsg);
            }).catch(() => {
                fallbackCopy(text, successMsg);
            });
        } else {
            fallbackCopy(text, successMsg);
        }
    }

    function fallbackCopy(text, successMsg) {
        const tempArea = document.createElement('textarea');
        tempArea.value = text;
        tempArea.style.position = 'fixed';
        tempArea.style.left = '-9999px';
        document.body.appendChild(tempArea);
        tempArea.select();
        try {
            document.execCommand('copy');
            showToast(successMsg);
        } catch (err) {
            alert("Please copy manually:\n" + text);
        }
        document.body.removeChild(tempArea);
    }

    // Build the bottom bar DOM
    function renderBottomBar() {
        const current = getCurrentStep();
        const allNotes = loadNotes();
        
        // Task 2: Provide default reminder note for Step 01 if not already customized
        if (!allNotes['index.html']) {
            allNotes['index.html'] = 'remind when you work shoot the video on the mac pro as well';
            saveNotes(allNotes);
        }
        
        const initialNote = allNotes[current.id] || '';
        const isMinimized = localStorage.getItem(MINIMIZED_KEY) === 'true';

        const bar = document.createElement('div');
        bar.id = 'notes-bottom-bar';
        if (isMinimized) {
            bar.classList.add('minimized');
        }

        const macProReminderHtml = (current.id === 'index.html' || current.id === '') 
            ? `<span class="notes-header-reminder-pill">🖥️ Work Rule: Shoot video on Mac Pro as well!</span>` 
            : '';

        bar.innerHTML = `
            <div class="notes-bar-inner">
                <div class="notes-bar-header" id="notes-toggle-trigger">
                    <div class="notes-header-left">
                        <span class="notes-badge-icon">📝</span>
                        <div class="notes-bar-title">
                            <span>Step ${current.num} Notes</span>
                            <span class="notes-step-badge">${current.short}</span>
                            ${macProReminderHtml}
                            <span class="notes-save-status saved" id="notes-status-text">💾 Saved in cookie</span>
                        </div>
                    </div>
                    <div class="notes-header-actions" onclick="event.stopPropagation()">
                        <button type="button" class="notes-btn notes-btn-copy" id="btn-copy-page">
                            📋 Copy This Note
                        </button>
                        <button type="button" class="notes-btn notes-btn-copy-all" id="btn-copy-all">
                            📑 Copy All Notes (All Steps)
                        </button>
                        <button type="button" class="notes-btn notes-btn-toggle" id="btn-toggle-bar" title="Toggle bar">
                            ${isMinimized ? '▲ Expand' : '▼ Minimize'}
                        </button>
                    </div>
                </div>
                <div class="notes-bar-body">
                    <textarea 
                        class="notes-textarea" 
                        id="notes-input" 
                        placeholder="${(current.id === 'index.html') ? 'remind when you work shoot the video on the mac pro as well' : `Write your private notes, production ideas, or comments for Step ${current.num} (${current.title})... Everything auto-saves to your cookie!` }">${initialNote}</textarea>
                    <div class="notes-bar-footer">
                        <div class="notes-storage-hint">
                            <span>Cookie: <span class="cookie-pill">handson_notes</span></span>
                            <span>• Persists across sessions</span>
                        </div>
                        <div id="notes-char-count">${initialNote.length} characters</div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(bar);

        // Event bindings
        const textarea = document.getElementById('notes-input');
        const statusText = document.getElementById('notes-status-text');
        const charCount = document.getElementById('notes-char-count');
        const toggleBtn = document.getElementById('btn-toggle-bar');
        const headerTrigger = document.getElementById('notes-toggle-trigger');
        const copyPageBtn = document.getElementById('btn-copy-page');
        const copyAllBtn = document.getElementById('btn-copy-all');

        // Toggle minimized
        function toggleMinimize() {
            bar.classList.toggle('minimized');
            const minimized = bar.classList.contains('minimized');
            localStorage.setItem(MINIMIZED_KEY, minimized ? 'true' : 'false');
            toggleBtn.textContent = minimized ? '▲ Expand' : '▼ Minimize';
        }

        toggleBtn.addEventListener('click', toggleMinimize);
        headerTrigger.addEventListener('click', (e) => {
            if (e.target.closest('.notes-header-actions')) return;
            toggleMinimize();
        });

        // Auto-save logic
        let saveTimeout;
        textarea.addEventListener('input', () => {
            statusText.textContent = "⏳ Saving...";
            statusText.classList.remove('saved');
            charCount.textContent = `${textarea.value.length} characters`;

            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                const notes = loadNotes();
                notes[current.id] = textarea.value;
                saveNotes(notes);
                statusText.textContent = "💾 Saved in cookie";
                statusText.classList.add('saved');
            }, 350);
        });

        // Copy single page notes
        copyPageBtn.addEventListener('click', () => {
            const note = textarea.value.trim();
            if (!note) {
                copyText(`### Notes for Step ${current.num}: ${current.title}\n(No notes written yet)`, "Empty note copied!");
                return;
            }
            const formatted = `### Notes for Step ${current.num}: ${current.title}\n\n${note}\n\n*Source: ${window.location.href}*`;
            copyText(formatted, `Step ${current.num} notes copied!`);
        });

        // Copy all notes compiled
        copyAllBtn.addEventListener('click', () => {
            const notes = loadNotes();
            const now = new Date().toLocaleString();
            let compiled = `# 🎬 Hands-On DO Sessions — My Personal Notes & Blueprint\n`;
            compiled += `Generated: ${now}\n`;
            compiled += `Repository: https://github.com/rifaterdemsahin/handson-do-sessions\n\n---\n\n`;

            STEPS.forEach(step => {
                const content = (notes[step.id] || '').trim();
                compiled += `## Step ${step.num}: ${step.title}\n`;
                compiled += `*Page:* ${step.url}\n\n`;
                if (content) {
                    compiled += `${content}\n\n`;
                } else {
                    compiled += `*(No notes recorded for this step yet)*\n\n`;
                }
                compiled += `---\n\n`;
            });

            copyText(compiled, "All step notes compiled & copied!");
        });
    }

    // Task 1: Highlight the active page in the top menu dynamically
    function highlightCurrentPageInNav() {
        const path = window.location.pathname;
        let pageName = path.substring(path.lastIndexOf('/') + 1);
        if (!pageName || pageName === '') {
            pageName = 'index.html';
        }

        // Highlight nav brand if on index.html
        if (pageName === 'index.html') {
            document.querySelectorAll('.nav-brand').forEach(el => el.classList.add('nav-item-active'));
        }

        // Search all links in shared-nav
        document.querySelectorAll('.shared-nav a').forEach(a => {
            const href = a.getAttribute('href');
            if (!href) return;
            const cleanHref = href.split('#')[0].split('?')[0].replace(/^\.\//, '');
            
            const isMatch = (cleanHref === pageName) || 
                            (pageName === 'index.html' && (cleanHref === '' || cleanHref === 'index.html'));

            if (isMatch && !href.startsWith('#')) {
                a.classList.add('nav-item-active');

                // Highlight parent dropdown button if inside one
                const parentDropdown = a.closest('.nav-dropdown');
                if (parentDropdown) {
                    const dropBtn = parentDropdown.querySelector('.nav-drop-btn');
                    if (dropBtn) {
                        dropBtn.classList.add('nav-dropdown-active');
                    }
                }
            }
        });
    }

    function init() {
        highlightCurrentPageInNav();
        renderBottomBar();
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
