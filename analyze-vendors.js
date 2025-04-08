// analyze-vendors.js
const fs = require('fs');
const path = require('path');

// Path to your vendors.js file
const vendorsPath = path.join(__dirname, '.next/server/vendors.js');

try {
  const content = fs.readFileSync(vendorsPath, 'utf8');
  
  // Look for common patterns that might use self
  const selfUsageRegex = /\bself\b(?!\s*=)/g;
  const matches = content.match(selfUsageRegex) || [];
  
  console.log(`Found ${matches.length} potential references to 'self'`);
  
  // Look at the beginning of the file (where the error occurs)
  console.log('\nFirst 300 characters of vendors.js:');
  console.log(content.substring(0, 300));
  
  // Extract module names from webpack comments
  const moduleRegex = /\/\*! (?:\S+ )?(?:exports provided: \S+ )?by (.+?) \*\//g;
  const modules = [];
  let match;
  
  while ((match = moduleRegex.exec(content)) !== null) {
    modules.push(match[1]);
  }
  
  console.log('\nModules found in vendors.js:');
  const uniqueModules = [...new Set(modules)];
  uniqueModules.forEach(mod => console.log(`- ${mod}`));
  
} catch (error) {
  console.error('Error analyzing vendors.js:', error);
}