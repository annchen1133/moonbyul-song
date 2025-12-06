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
    const linkManifest = document.createElement('link');
    linkManifest.rel = 'manifest';
    linkManifest.href = 'manifest.json';
    document.head.appendChild(linkManifest);

    // iOS Web App Capable
    const metaApple = document.createElement('meta');
    metaApple.name = 'apple-mobile-web-app-capable';
    metaApple.content = 'yes';
    document.head.appendChild(metaApple);

    // iOS Icon
    const linkIcon = document.createElement('link');
    linkIcon.rel = 'apple-touch-icon';
    linkIcon.href = 'icon.png';
    document.head.appendChild(linkIcon);
}
injectAppMeta();

// ==========================================
// 2. 產生選單 HTML
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

// 3. 選單開關功能
function toggleMenu() {
    const menu = document.getElementById('songMenu');
    if (menu) menu.classList.toggle('open');
}

// 4. 點擊外部關閉選單
document.addEventListener('click', function(event) {
    const menu = document.getElementById('songMenu');
    const btn = document.querySelector('.fab-btn');
    if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// ==========================================
// 🛡️ 強力防複製保護機制 (升級版)
// ==========================================

// 1. 禁止滑鼠右鍵
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

// 2. 禁止鍵盤快捷鍵
document.addEventListener('keydown', function(e) {
    // F12, Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P
    if (e.key === 'F12' || 
        (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p'))) {
        e.preventDefault();
        e.stopPropagation();
    }
}, false);

// 3. 注入強力 CSS (禁止選取 + 禁止 iOS 長按)
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    * {
        -webkit-user-select: none !important; /* Chrome/Safari/Opera */
        -moz-user-select: none !important;    /* Firefox */
        -ms-user-select: none !important;     /* IE/Edge */
        user-select: none !important;         /* 標準語法 */
        
        -webkit-touch-callout: none !important; /* 禁止 iOS 長按跳出選單 */
    }
    
    /* 允許輸入框可以選取 (如果有搜尋框的話) */
    input, textarea {
        -webkit-user-select: text !important;
        user-select: text !important;
    }
`;
document.head.appendChild(styleSheet);
