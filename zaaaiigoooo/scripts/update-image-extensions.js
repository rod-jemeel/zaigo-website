/**
 * Update image extensions in code
 * Changes references from PNG to WebP in relevant files
 * 
 * Usage:
 * node scripts/update-image-extensions.js
 */

const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  path.join(__dirname, '../src/lib/image-utils.ts'),
  path.join(__dirname, '../src/components/ui/team-member-card.tsx')
];

function updateFiles() {
  try {
    // Process each file
    filesToUpdate.forEach(filePath => {
      console.log(`Updating ${path.basename(filePath)}...`);
      
      if (!fs.existsSync(filePath)) {
        console.error(`File ${filePath} does not exist!`);
        return;
      }
      
      // Read file content
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Create backup
      fs.writeFileSync(`${filePath}.backup`, content);
      console.log(`Created backup: ${path.basename(filePath)}.backup`);
      
      // Replace PNG extensions with WebP
      const originalContent = content;
      
      // Replace image-utils.ts default extension
      content = content.replace(
        /return `\/images\/team\/people\/${formattedNameWithoutExtension}\.png`;/g,
        'return `/images/team/people/${formattedNameWithoutExtension}.webp`;'
      );
      
      // Replace special cases in team-member-card.tsx
      content = content.replace(
        /'\/images\/team\/people\/([^']+)\.png'/g,
        "'/images/team/people/$1.webp'"
      );
      
      // Replace fallback path construction
      content = content.replace(
        /const imagePath = specialCases\[formattedName\] \|\| `\/images\/team\/people\/${formattedName}\.png`;/g,
        'const imagePath = specialCases[formattedName] || `/images/team/people/${formattedName}.webp`;'
      );
      
      // Only write if changes were made
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`✓ Updated ${path.basename(filePath)}`);
      } else {
        console.log(`No changes needed in ${path.basename(filePath)}`);
      }
    });
    
    console.log('\nUpdate complete!');
    console.log('Next steps:');
    console.log('1. Run the convert-to-webp.js script to create WebP images');
    console.log('2. Build and deploy your site');
    
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

updateFiles();