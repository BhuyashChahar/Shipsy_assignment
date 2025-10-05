#!/bin/bash

echo "🚀 Deploying Task Management System to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel first:"
    vercel login
fi

echo "📦 Building project..."
npm run build

echo "🚀 Deploying to Vercel..."
vercel

echo "✅ Deployment complete!"
echo "📝 Don't forget to set JWT_SECRET environment variable in Vercel dashboard"
echo "🔗 Go to your Vercel dashboard to configure environment variables"
