const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const pagesDir = path.join(srcDir, 'pages');

function replaceFile(filePath, replacer) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    content = replacer(content);
    fs.writeFileSync(filePath, content, 'utf-8');
}

// 1. NebulaLanding.jsx
replaceFile(path.join(srcDir, 'NebulaLanding.jsx'), (c) => {
    // Import NebulaLogo
    if (!c.includes('NebulaLogo')) {
        c = c.replace(/import \{ Link \} from 'react-router-dom';/, `import { Link } from 'react-router-dom';\nimport NebulaLogo from './components/NebulaLogo';`);
    }
    // Replace the specific logo div
    c = c.replace(
        /<div className="flex items-center gap-2">[\s\S]*?<div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-nebula-cyan to-nebula-purple[\s\S]*?<\/div>[\s\S]*?<span className="font-display font-bold tracking-widest text-white text-lg">NEBULA<\/span>[\s\S]*?<\/div>/,
        `<NebulaLogo />`
    );
    return c;
});

// 2. Home.jsx (Dashboard)
replaceFile(path.join(pagesDir, 'Home.jsx'), (c) => {
    if (!c.includes('NebulaLogo')) {
        c = c.replace(/import \{.*?\} from 'lucide-react';/, (match) => match + `\nimport NebulaLogo from '../components/NebulaLogo';`);
    }
    // The logo block in Home.jsx
    c = c.replace(
        /<div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white\/5">[\s\S]*?<div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-nebula-cyan to-nebula-purple flex items-center justify-center shadow-lg shadow-nebula-purple\/20">[\s\S]*?<\/div>[\s\S]*?<span className="ml-3 font-display font-bold text-xl tracking-wide hidden lg:block">NEBULA<\/span>[\s\S]*?<\/div>/,
        `<div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">\n                <NebulaLogo className="lg:flex hidden" />\n                <NebulaLogo showText={false} className="flex lg:hidden" />\n            </div>`
    );
    return c;
});

// 3. Profile.jsx
replaceFile(path.join(pagesDir, 'Profile.jsx'), (c) => {
    if (!c.includes('NebulaLogo')) {
        c = c.replace(/import \{.*?\} from 'lucide-react';/, (match) => match + `\nimport NebulaLogo from '../components/NebulaLogo';`);
    }
    c = c.replace(
        /<div className="flex items-center justify-center md:justify-start gap-3 mb-12 md:px-2 cursor-pointer group"[^>]*>[\s\S]*?<div class.*?bg-white\/5.*?><div.*?bg-white.*?><\/div><\/div>[\s\S]*?<span class.*?hidden md:block">NEBULA<\/span>[\s\S]*?<\/div>/,
        `<div className="mb-12 md:px-2">\n                <NebulaLogo className="md:flex hidden" />\n                <NebulaLogo showText={false} className="flex md:hidden justify-center" />\n            </div>`
    );
    return c;
});

// 4. Schedule.jsx
replaceFile(path.join(pagesDir, 'Schedule.jsx'), (c) => {
    if (!c.includes('NebulaLogo')) {
        c = c.replace(/import \{.*?\} from 'lucide-react';/, (match) => match + `\nimport NebulaLogo from '../components/NebulaLogo';`);
    }
    c = c.replace(
        /<div className="flex items-center gap-3">[\s\S]*?<div className="w-8 h-8 rounded-lg border border-white\/10 bg-white\/5 flex items-center justify-center">[\s\S]*?<\/div>[\s\S]*?<span className="font-display font-bold tracking-widest text-white">NEBULA<\/span>[\s\S]*?<\/div>/,
        `<NebulaLogo />`
    );
    return c;
});

// 5. Login.jsx
replaceFile(path.join(pagesDir, 'Login.jsx'), (c) => {
    if (!c.includes('NebulaLogo')) {
        c = c.replace(/import \{.*?\} from 'lucide-react';/, (match) => match + `\nimport NebulaLogo from '../components/NebulaLogo';`);
    }
    c = c.replace(
        /<div className="flex items-center gap-3 group cursor-pointer">[\s\S]*?<div className="w-12 h-12 rounded-xl border border-white\/10 bg-white\/5 flex items-center justify-center backdrop-blur-md.*?">[\s\S]*?<\/div>[\s\S]*?<span className="font-display font-bold text-3xl tracking-widest text-white">NEBULA<\/span>[\s\S]*?<\/div>/,
        `<NebulaLogo />`
    );
    return c;
});

console.log("Replaced logos!");
