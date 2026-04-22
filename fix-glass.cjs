const fs = require('fs');
const path = require('path');

const globalsPath = path.join(__dirname, 'src', 'globals.css');
let css = fs.readFileSync(globalsPath, 'utf8');

// Remove all .glass-panel definitions
css = css.replace(/\.glass-panel\s*\{[^}]+\}/g, '');

// Prepend the single source of truth for glass-panel
const newGlassPanel = `
@layer components {
  .glass-panel {
    background: rgba(3, 1, 8, 0.6);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
}
`;

css = css.replace(/@tailwind utilities;/, `@tailwind utilities;\n${newGlassPanel}`);

fs.writeFileSync(globalsPath, css);
console.log('Cleaned up duplicate .glass-panel classes!');
