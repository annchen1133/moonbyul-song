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
// 1. 自動注入 App 設定 (讓它像 App 一樣全螢幕)
// ==========================================
function injectAppMeta() {
    if (!document.head) return;
    
    // 連結 manifest
    const linkManifest = document.createElement('link');
    linkManifest.rel = 'manifest';
    linkManifest.href = 'manifest.json';
    document.head.appendChild(linkManifest);

    // iOS 全螢幕設定
    const metaApple = document.createElement('meta');
    metaApple.name = 'apple-mobile-web-app-capable';
    metaApple.content = 'yes';
    document.head.appendChild(metaApple);

    // iOS 狀態列顏色 (透明黑)
    const metaStatus = document.createElement('meta');
    metaStatus.name = 'apple-mobile-web-app-status-bar-style';
    metaStatus.content = 'black-translucent';
    document.head.appendChild(metaStatus);

    // iOS 圖示
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

// 選單開關
function toggleMenu() {
    const menu = document.getElementById('songMenu');
    if (menu) menu.classList.toggle('open');
}

// 點擊外部關閉選單
document.addEventListener('click', function(event) {
    const menu = document.getElementById('songMenu');
    const btn = document.querySelector('.fab-btn');
    if (menu && btn && !menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.remove('open');
    }
});

// ==========================================
// 3. 🛡️ 強力防複製 & App 質感優化 CSS
// ==========================================

// 禁止滑鼠右鍵
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

// 禁止鍵盤快捷鍵
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'p'))) {
        e.preventDefault();
        e.stopPropagation();
    }
}, false);

// 注入 CSS (包含防複製 + 禁止手機回彈效果)
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important; /* 禁止 iOS 長按選單 */
        -webkit-tap-highlight-color: transparent; /* 移除點擊藍框 */
    }
    
    /* 讓整個網頁滑動起來像 App，不會有彈性拉動的空白 */
    body {
        overscroll-behavior-y: none;
    }

    input, textarea {
        -webkit-user-select: text !important;
        user-select: text !important;
    }
`;
document.head.appendChild(styleSheet);
