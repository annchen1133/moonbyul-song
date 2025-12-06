// --- 設定歌曲清單 (以後加歌只要改這裡！) ---
const songs = [
    { title: "S.O.S", file: "sos.html", icon: "💿" },
    { title: "Goodbyes and Sad Eyes", file: "goodbyesandsadeyes.html", icon: "🫧" },
    { title: "ICY BBY", file: "icybby.html", icon: "🧊" },
    { title: "Is This Love?", file: "isthislove.html", icon: "💘" },
    { title: "PRESENT", file: "present.html", icon: "🎁" },
    { title: "Eclipse", file: "eclipse.html", icon: "🌑" },    
    { title: "LUNATIC", file: "lunatic.html", icon: "👻" },
    { title: "Absence", file: "absence.html", icon: "☁️" },
    { title: "Think About", file: "thinkabout.html", icon: "💭" },
    { title: "C.I.T.T", file: "citt.html", icon: "🧀" },
    { title: "TOUCHIN&MOVIN", file: "touchinmovin.html", icon: "💃" },
    { title: "Memories", file: "memories.html", icon: "🎞️" },
    { title: "Attention Seeker", file: "attentionseeker.html", icon: "📢" },
// ⬇️ 以後有新歌，複製上面一行改掉內容即可 ⬇️
// { title: "新歌名", file: "新檔案.html", icon: "🎵" },

];

// ==========================================
// 1. 自動注入 App 設定 (PWA & iOS)
// ==========================================
function injectAppMeta() {
    if (!document.head) return;
    
    // PWA Manifest
    let linkManifest = document.querySelector('link[rel="manifest"]');
    if (!linkManifest) {
        linkManifest = document.createElement('link');
        linkManifest.rel = 'manifest';
        linkManifest.href = 'manifest.json';
        document.head.appendChild(linkManifest);
    }

    // iOS Web App Capable
    let metaApple = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (!metaApple) {
        metaApple = document.createElement('meta');
        metaApple.name = 'apple-mobile-web-app-capable';
        metaApple.content = 'yes';
        document.head.appendChild(metaApple);
    }

    // iOS Icon
    let linkIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!linkIcon) {
        linkIcon = document.createElement('link');
        linkIcon.rel = 'apple-touch-icon';
        linkIcon.href = 'icon.png';
        document.head.appendChild(linkIcon);
    }
}
injectAppMeta();

// ==========================================
// 2. 自動加入「回首頁」按鈕
// ==========================================
function addHomeButton() {
    const currentFile = window.location.pathname.split("/").pop();
    if (currentFile !== "index.html" && currentFile !== "") {
        const topBar = document.querySelector('.top-bar');
        if (topBar && !topBar.querySelector('.home-btn')) {
            const homeBtnHtml = `
                <a href="index.html" class="home-btn" style="text-decoration: none; margin-right: auto;">
                    <span style="font-size: 20px;">🏠</span>
                </a>
            `;
            topBar.insertAdjacentHTML('afterbegin', homeBtnHtml);
        }
    }
}

// ==========================================
// 3. ✅ 自動更新全站 Footer (警示文字)
// ==========================================
function updateGlobalFooter() {
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.innerHTML = `
            <p style="margin-bottom: 10px; font-weight: bold;">Create for moonbyul's atm</p>
            <p style="font-size: 10px; opacity: 0.6; line-height: 1.6; margin: 0;">
                本網站為粉絲自製，非官方應用程式。<br>
                內容僅供個人學習與應援使用，<br>
                嚴禁商業用途或未經授權的修改與轉載。<br>
                (空耳部分由 Gemini 協助製作)
            </p>
        `;
    }
}

// 統一在頁面載入後執行這些 UI 修改
document.addEventListener('DOMContentLoaded', () => {
    addHomeButton();
    updateGlobalFooter(); // 執行更新 Footer
});


// ==========================================
// 4. 產生選單 HTML
// ==========================================
const currentPath = window.location.pathname.split("/").pop(); 
let menuItemsHTML = "";

songs.forEach(song => {
    const isActive = currentPath === song.file ? "active" : "";
    menuItemsHTML += `
        <a href="${song.file}" class="menu-item ${isActive}">
            <span>${song.icon}</span> ${song.title}
        </a>
    `;
});

const menuHTML = `
    <div class="fab-container">
        <div class="song-menu" id="songMenu">
            <div class="menu-header">Playlist</div>
            ${menuItemsHTML}
        </div>
        <button class="fab-btn" onclick="toggleMenu()">🎵</button>
    </div>
`;

if (document.body) {
    document.body.insertAdjacentHTML('beforeend', menuHTML);
}

function toggleMenu() {
    const menu = document.getElementById('songMenu');
    if (menu) menu.classList.toggle('open');
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('songMenu');
    const btn = document.querySelector('.fab-btn');
    if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// ==========================================
// 5. 🛡️ 強力防複製 & CSS 優化
// ==========================================

document.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p'))) {
        e.preventDefault();
        e.stopPropagation();
    }
}, false);

const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent;
    }
    body { overscroll-behavior-y: none; }
    input, textarea { -webkit-user-select: text !important; user-select: text !important; }
    
    .home-btn {
        padding: 8px;
        border-radius: 50%;
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .home-btn:hover {
        background-color: rgba(0,0,0,0.05);
    }
    body.dark-mode .home-btn:hover {
        background-color: rgba(255,255,255,0.1);
    }
`;
document.head.appendChild(styleSheet);
