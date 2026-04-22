const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function replaceFile(filename, replacer) {
    const filePath = path.join(publicDir, filename);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    content = replacer(content);
    fs.writeFileSync(filePath, content, 'utf-8');
}

// 1. home-ui-design.html (Dashboard)
replaceFile('home-ui-design.html', (c) => {
    // New Meeting -> schedule-ui-design.html
    c = c.replace(/onclick="window\.location\.href='[^']*'"([^>]*?)>(\s*<i data-lucide="video")/g, `onclick="window.location.href='/schedule-ui-design.html'"$1>$2`);
    // Join Now -> setup-ui-design.html (already patched correctly earlier, just reinforcing)
    c = c.replace(/(<button[^>]*?)>([\s\S]*?Join Now[\s\S]*?)<\/button>/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match; // already patched
        return `${p1} onclick="window.location.href='/setup-ui-design.html'">${p2}</button>`;
    });
    // Recordings -> recording-ui-design.html
    c = c.replace(/(<button[^>]*?)>(\s*<i data-lucide="folder-open"([^>]*?)><\/i>\s*Recordings)/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/recording-ui-design.html'">${p2}`;
    });
    // Settings icon -> settings-ui-design.html
    c = c.replace(/(<button[^>]*?)>(\s*<i data-lucide="settings")/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/settings-ui-design.html'">${p2}`;
    });
    return c;
});

// 2. setup-ui-design.html (Device Lobby)
replaceFile('setup-ui-design.html', (c) => {
    // Join Meeting button -> meeting-ui-design.html
    c = c.replace(/(<button[^>]*?)>([\s\S]*?Join Meeting)/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/meeting-ui-design.html'">${p2}`;
    });
    return c;
});

// 3. schedule-ui-design.html (Schedule Meeting)
replaceFile('schedule-ui-design.html', (c) => {
    // Generate Invite Link -> invite-ui-design.html
    c = c.replace(/(<button[^>]*?)>([\s\S]*?Generate Invite Link)/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/invite-ui-design.html'">${p2}`;
    });
    // Dashboard Back Link -> home-ui-design.html
    c = c.replace(/(<a[^>]*?)>([\s\S]*?Dashboard)/g, (match, p1, p2) => {
        if (p1.includes('href="/home-ui-design.html"')) return match;
        return `${p1.replace(/href="[^"]*"/, '')} href="/home-ui-design.html">${p2}`;
    });
    return c;
});

// 4. invite-ui-design.html (Visitor Invite Link)
replaceFile('invite-ui-design.html', (c) => {
    // Join Waiting Room -> setup-ui-design.html
    // This is a form, we just ensure action is correct
    c = c.replace(/<form[^>]*action="[^"]*"[^>]*>/g, `<form class="space-y-6" action="/setup-ui-design.html" method="GET">`);
    return c;
});

// 5. meeting-ui-design.html (Main Meeting Room)
replaceFile('meeting-ui-design.html', (c) => {
    // End call button (Leave / phone-off) -> home-ui-design.html
    c = c.replace(/(<button[^>]*?)>(\s*<i data-lucide="phone-off")/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/home-ui-design.html'">${p2}`;
    });
    // Leave text button -> home-ui-design.html
    c = c.replace(/(<button[^>]*?)>([\s\S]*?Leave)/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/home-ui-design.html'">${p2}`;
    });
    // Screen share (monitor-up) -> screenshare-ui-design.html
    c = c.replace(/(<button[^>]*?)>(\s*<i data-lucide="monitor-up")/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/screenshare-ui-design.html'">${p2}`;
    });
    // Whiteboard (pen-tool / image icon) -> whiteboard-ui-design.html
    c = c.replace(/(<button[^>]*?)>(\s*<i data-lucide="(pen-tool|image)")/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/whiteboard-ui-design.html'">${p2}`;
    });
    // Settings (settings) -> settings-ui-design.html
    c = c.replace(/(<button[^>]*?)>(\s*<i data-lucide="settings")/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/settings-ui-design.html'">${p2}`;
    });
    return c;
});

// 6. screenshare-ui-design.html (Screen Share)
replaceFile('screenshare-ui-design.html', (c) => {
    // End call / Return to meeting -> meeting-ui-design.html
    c = c.replace(/(<button[^>]*?)>([\s\S]*?(phone-off|Leave))/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/meeting-ui-design.html'">${p2}`;
    });
    // Stop sharing (monitor-off) -> meeting-ui-design.html
    c = c.replace(/(<button[^>]*?)>(\s*<i data-lucide="monitor-off")/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/meeting-ui-design.html'">${p2}`;
    });
    return c;
});

// 7. whiteboard-ui-design.html (Whiteboard)
replaceFile('whiteboard-ui-design.html', (c) => {
    // Close / Back arrow -> meeting-ui-design.html
    c = c.replace(/(<button[^>]*?)>([\s\S]*?(arrow-left|phone-off|Leave))/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/meeting-ui-design.html'">${p2}`;
    });
    return c;
});

// 8. settings-ui-design.html (Settings)
replaceFile('settings-ui-design.html', (c) => {
    // Close / Save -> home-ui-design.html
    c = c.replace(/(<button[^>]*?)>([\s\S]*?(x|Save Changes))/g, (match, p1, p2) => {
        if (p1.includes('onclick')) return match;
        return `${p1} onclick="window.location.href='/home-ui-design.html'">${p2}`;
    });
    return c;
});

// 9. recording-ui-design.html (Recordings)
replaceFile('recording-ui-design.html', (c) => {
    // Back arrow -> home-ui-design.html
    c = c.replace(/(<a[^>]*?)>([\s\S]*?arrow-left)/g, (match, p1, p2) => {
        if (p1.includes('href="/home-ui-design.html"')) return match;
        return `${p1.replace(/href="[^"]*"/, '')} href="/home-ui-design.html">${p2}`;
    });
    return c;
});

// 10. login-ui-design.html (Login)
replaceFile('login-ui-design.html', (c) => {
    // Login form -> home-ui-design.html
    c = c.replace(/<form[^>]*action="[^"]*"[^>]*>/g, `<form class="space-y-6" action="/home-ui-design.html" method="GET">`);
    // Back to Orbit -> / (Main React Landing)
    c = c.replace(/(<a[^>]*?)>([\s\S]*?Return to Orbit)/g, (match, p1, p2) => {
        if (p1.includes('href="/"')) return match;
        return `${p1.replace(/href="[^"]*"/, '')} href="/">${p2}`;
    });
    return c;
});

console.log("All templates linked comprehensively!");
