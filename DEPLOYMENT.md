# 🚀 Deploy to Vercel - Step by Step Guide

## Method 1: Using Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy from Project Directory
```bash
cd /Users/bhuyash./Documents/Files\ From\ d.localized/projects/shipsy
vercel
```

### Step 4: Set Environment Variables
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add: `JWT_SECRET` with a strong secret (e.g., `my-super-secret-jwt-key-2024`)

### Step 5: Redeploy
```bash
vercel --prod
```

## Method 2: GitHub Integration

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New Repository"
3. Name it "task-manager" or "shipsy"
4. Make it public or private
5. Don't initialize with README (we already have one)

### Step 2: Push Code to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Task Management System"

# Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

### Step 4: Configure Environment Variables
1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add: `JWT_SECRET` = `your-super-secret-jwt-key-here`
4. Redeploy

## 🔧 Environment Variables Required

| Variable | Value | Description |
|----------|-------|-------------|
| `JWT_SECRET` | `your-secret-key` | Strong secret for JWT authentication |

## 📱 After Deployment

Your app will be available at: `https://your-project-name.vercel.app`

### Features Available:
- ✅ User registration and login
- ✅ Task creation, editing, deletion
- ✅ Task filtering and sorting
- ✅ Search functionality
- ✅ Pagination
- ✅ Dark mode UI
- ✅ Responsive design

## 🐛 Troubleshooting

### Common Issues:

1. **Authentication not working**: Make sure `JWT_SECRET` is set in environment variables
2. **Build fails**: Check that all dependencies are in `package.json`
3. **Database issues**: The app uses in-memory storage, so data resets on each deployment

### For Production Database:
Consider upgrading to a real database like:
- **Vercel Postgres** (recommended)
- **PlanetScale**
- **Supabase**

## 🎉 Success!

Once deployed, you'll have a fully functional Task Management System running on Vercel with:
- Secure authentication
- Complete CRUD operations
- Modern dark mode UI
- All required features implemented
