#!/bin/bash

# Script deployment untuk IDCloudHost
echo "🚀 Starting deployment to IDCloudHost..."

# Build project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create deployment directory
    mkdir -p deploy
    
    # Copy built files to deployment directory
    cp -r dist/* deploy/
    
    # Copy additional files if needed
    cp package.json deploy/
    cp server.js deploy/ 2>/dev/null || echo "No server.js found"
    
    echo "📁 Files ready for deployment in 'deploy' directory"
    echo ""
    echo "📋 Next steps:"
    echo "1. Upload contents of 'deploy' directory to your IDCloudHost public_html"
    echo "2. Configure your domain in IDCloudHost cPanel"
    echo "3. Set up environment variables in IDCloudHost"
    echo ""
    echo "🌐 Your app will be available at your domain"
    
else
    echo "❌ Build failed!"
    exit 1
fi 