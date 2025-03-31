const { execSync } = require('child_process');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Start the app directly (bypassing the build)
  console.log('Starting application...');
  execSync('NODE_ENV=production node server.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Deployment failed:', error);
}