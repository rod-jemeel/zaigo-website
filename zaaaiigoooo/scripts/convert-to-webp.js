/**
 * Image conversion script for Zaigo team photos
 * Converts PNG images to WebP format with optimization
 * 
 * Usage:
 * npm install sharp
 * node scripts/convert-to-webp.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, '../public/images/team/people');
const quality = 80; // WebP quality (0-100)

async function convertImages() {
  try {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(sourceDir)) {
      console.error(`Source directory ${sourceDir} does not exist!`);
      return;
    }

    // Get all PNG files in the directory
    const files = fs.readdirSync(sourceDir);
    const imageFiles = files.filter(file => 
      ['.png', '.PNG', '.jpeg', '.jpg', '.JPEG', '.JPG'].some(ext => file.toLowerCase().endsWith(ext))
    );

    if (imageFiles.length === 0) {
      console.log('No image files found to convert.');
      return;
    }

    console.log(`Found ${imageFiles.length} image files to convert to WebP...`);

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(sourceDir, file);
      const fileNameWithoutExt = file.substring(0, file.lastIndexOf('.'));
      const outputPath = path.join(sourceDir, `${fileNameWithoutExt}.webp`);

      console.log(`Converting ${file} to WebP...`);

      try {
        // Optimize and convert to WebP
        await sharp(inputPath)
          .webp({ quality })
          .toFile(outputPath);

        console.log(`✓ Created ${fileNameWithoutExt}.webp`);
        
        // Optional: Create backup of original
        // fs.renameSync(inputPath, `${inputPath}.backup`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }

    console.log('Conversion complete!');
    console.log('Next steps:');
    console.log('1. Update src/lib/image-utils.ts to use .webp extension');
    console.log('2. Update src/components/ui/team-member-card.tsx to use .webp extension');
    
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

convertImages();