# Deployment Workflow Guide

## 🚀 Quick Deploy Process

Your project is connected to:
- **GitHub**: https://github.com/Gurustem/MICM
- **Vercel**: https://micm-a573.vercel.app

## 📝 How to Push Changes and Deploy

### Method 1: Using the Batch Script (Easiest)

1. **Double-click** `push-and-deploy.bat` in your project folder
2. Enter a commit message (or press Enter for default)
3. The script will:
   - Add all changes
   - Commit them
   - Push to GitHub
   - Vercel will automatically deploy

### Method 2: Using Cursor's Git Integration

1. **Make your edits** in Cursor
2. **Open Source Control** (Ctrl+Shift+G or click the Git icon in sidebar)
3. **Stage changes**: Click the "+" next to files you want to commit
4. **Commit**: Enter a message and click "Commit"
5. **Push**: Click the "..." menu → "Push" or use the push button

### Method 3: Using Terminal Commands

```bash
# 1. Add all changes
git add .

# 2. Commit with a message
git commit -m "Your descriptive message here"

# 3. Push to GitHub (triggers Vercel deployment)
git push origin main
```

## ⚡ Automatic Deployment

**Vercel automatically deploys** when you push to the `main` branch on GitHub!

- ✅ Push to `main` → Vercel detects changes
- ✅ Vercel builds your project
- ✅ Deploys to: https://micm-a573.vercel.app
- ✅ Usually takes 1-3 minutes

## 📋 Best Practices

### Commit Messages
Use clear, descriptive messages:
- ✅ `"Add user profile page"`
- ✅ `"Fix login authentication bug"`
- ✅ `"Update dashboard styling"`
- ❌ `"fix"` or `"update"` (too vague)

### Before Pushing

**Always test before deploying!** Follow these steps:

1. **✅ Test your changes locally**
   ```bash
   npm run dev
   ```
   - Opens at http://localhost:5173
   - Test the features you changed
   - Check for visual issues or broken functionality
   - Press `Ctrl+C` to stop the server when done

2. **✅ Check for build errors**
   ```bash
   npm run build
   ```
   - This simulates what Vercel will do
   - Fix any TypeScript or build errors before pushing
   - If build succeeds, you're good to go!

3. **✅ Review your changes in Cursor's Source Control**
   - Press `Ctrl+Shift+G` to open Source Control
   - Review the files you've modified (highlighted in green)
   - Make sure you're not committing:
     - Debug code (`console.log`, commented code)
     - Temporary files
     - Sensitive information (passwords, API keys)
   - Unstage files you don't want to commit (click the "-" icon)

**Quick Check Script**: Run `check-before-push.bat` to automatically test steps 1 & 2!

### Frequency
- Push frequently (after completing a feature or fix)
- Don't wait until everything is perfect
- Small, frequent commits are better than large ones

## 🔍 Check Deployment Status

1. Go to: https://vercel.com/dashboard
2. Find your "MICM" project
3. View deployment logs and status

## 🐛 Troubleshooting

### If push fails:
```bash
# Pull latest changes first
git pull origin main

# Then try pushing again
git push origin main
```

### If Vercel deployment fails:
1. Check Vercel dashboard for error logs
2. Verify `package.json` is valid
3. Ensure build command works locally: `npm run build`

## 📞 Quick Reference

- **GitHub Repo**: https://github.com/Gurustem/MICM
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Live Site**: https://micm-a573.vercel.app
- **Local Dev**: `npm run dev` → http://localhost:5173

---

**Remember**: Every push to `main` = Automatic Vercel deployment! 🎉

