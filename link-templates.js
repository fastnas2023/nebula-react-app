import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

function replaceFile(filename, replacements) {
    const filePath = path.join(publicDir, filename);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    replacements.forEach(r => {
        content = content.replace(r.search, r.replace);
    });
    fs.writeFileSync(filePath, content, 'utf-8');
}

// 1. home-ui-design.html
replaceFile('home-ui-design.html', [
    {
        search: /<button class="w-full bg-nebula-cyan text-black[^>]*>([\s\S]*?)<\/button>/g,
        replace: `<button onclick="window.location.href='/setup-ui-design.html'" class="w-full bg-nebula-cyan text-black hover:bg-cyan-400 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2">$1</button>`
    },
    {
        search: /<button class="flex items-center gap-3 w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-white\/5 rounded-lg transition-colors group">([\s\S]*?)<i data-lucide="settings"/g,
        replace: `<button onclick="window.location.href='/settings-ui-design.html'" class="flex items-center gap-3 w-full px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group">$1<i data-lucide="settings"`
    },
    {
        search: /<button class="flex-1 bg-white\/5 hover:bg-white\/10 text-white[^>]*>([\s\S]*?)<\/button>/g,
        replace: `<button onclick="window.location.href='/setup-ui-design.html'" class="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-4 rounded-xl border border-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2">$1</button>`
    }
]);

// 2. setup-ui-design.html
replaceFile('setup-ui-design.html', [
    {
        search: /<button class="flex-1 bg-nebula-cyan text-black[^>]*>([\s\S]*?)<\/button>/g,
        replace: `<button onclick="window.location.href='/meeting-ui-design.html'" class="flex-1 bg-nebula-cyan text-black hover:bg-cyan-400 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">$1</button>`
    },
    {
        search: /<button class="px-6 py-3 bg-white\/5 text-white hover:bg-white\/10 rounded-xl transition-colors">/g,
        replace: `<button onclick="window.location.href='/home-ui-design.html'" class="px-6 py-3 bg-white/5 text-white hover:bg-white/10 rounded-xl transition-colors">`
    }
]);

// 3. meeting-ui-design.html
replaceFile('meeting-ui-design.html', [
    {
        search: /<button class="w-12 h-12 rounded-2xl bg-white\/10 hover:bg-white\/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group">([\s\S]*?)<i data-lucide="monitor-up"/g,
        replace: `<button onclick="window.location.href='/screenshare-ui-design.html'" class="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group">$1<i data-lucide="monitor-up"`
    },
    {
        search: /<button class="w-12 h-12 rounded-2xl bg-white\/10 hover:bg-white\/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group">([\s\S]*?)<i data-lucide="pen-tool"/g,
        replace: `<button onclick="window.location.href='/whiteboard-ui-design.html'" class="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group">$1<i data-lucide="pen-tool"`
    },
    {
        search: /<button class="w-12 h-12 rounded-2xl bg-white\/10 hover:bg-white\/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group">([\s\S]*?)<i data-lucide="settings"/g,
        replace: `<button onclick="window.location.href='/settings-ui-design.html'" class="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group">$1<i data-lucide="settings"`
    },
    {
        search: /<button class="w-16 h-12 rounded-2xl bg-nebula-magenta hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-\[0_0_20px_rgba\(255,46,147,0\.4\)\]">/g,
        replace: `<button onclick="window.location.href='/home-ui-design.html'" class="w-16 h-12 rounded-2xl bg-nebula-magenta hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,46,147,0.4)]">`
    }
]);

// 4. screenshare-ui-design.html
replaceFile('screenshare-ui-design.html', [
    {
        search: /<button class="w-12 h-12 rounded-2xl bg-nebula-magenta hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-\[0_0_20px_rgba\(255,46,147,0\.4\)\]">/g,
        replace: `<button onclick="window.location.href='/meeting-ui-design.html'" class="w-12 h-12 rounded-2xl bg-nebula-magenta hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,46,147,0.4)]">`
    }
]);

// 5. whiteboard-ui-design.html
replaceFile('whiteboard-ui-design.html', [
    {
        search: /<button class="w-10 h-10 rounded-xl bg-white\/5 hover:bg-white\/10 flex items-center justify-center text-white transition-colors">/g,
        replace: `<button onclick="window.location.href='/meeting-ui-design.html'" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors">`
    },
    {
        search: /<button class="w-12 h-12 rounded-2xl bg-nebula-magenta hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-\[0_0_20px_rgba\(255,46,147,0\.4\)\]">/g,
        replace: `<button onclick="window.location.href='/meeting-ui-design.html'" class="w-12 h-12 rounded-2xl bg-nebula-magenta hover:bg-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(255,46,147,0.4)]">`
    }
]);

// 6. settings-ui-design.html
replaceFile('settings-ui-design.html', [
    {
        search: /<button class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white\/10 text-gray-400 hover:text-white transition-colors">/g,
        replace: `<button onclick="window.history.back()" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">`
    },
    {
        search: /<button class="px-6 py-2\.5 bg-white\/5 text-white hover:bg-white\/10 rounded-xl transition-colors font-medium">/g,
        replace: `<button onclick="window.history.back()" class="px-6 py-2.5 bg-white/5 text-white hover:bg-white/10 rounded-xl transition-colors font-medium">`
    },
    {
        search: /<button class="px-6 py-2\.5 bg-nebula-cyan text-black hover:bg-cyan-400 rounded-xl transition-all duration-300 font-bold hover:shadow-\[0_0_20px_rgba\(0,240,255,0\.4\)\]">/g,
        replace: `<button onclick="window.history.back()" class="px-6 py-2.5 bg-nebula-cyan text-black hover:bg-cyan-400 rounded-xl transition-all duration-300 font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">`
    }
]);

console.log("Templates linked successfully!");
