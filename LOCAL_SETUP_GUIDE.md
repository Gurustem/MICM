# Local Development Setup Guide

## ✅ Quick Start

Your dependencies are already installed! Here's how to run the app locally.

---

## 🚀 Start the Development Server

### Method 1: Using the Batch Script (Easiest)

**Double-click**: `start-dev-server.bat`

This will:
- Start the development server
- Open at http://localhost:5173
- Show you the URL in the terminal

### Method 2: Using Terminal/Command Line

1. **Open Terminal in Cursor**
   - Press `` Ctrl+` `` (backtick key)
   - Or: `Terminal` → `New Terminal`

2. **Run the dev command**
   ```bash
   npm run dev
   ```

3. **You'll see output like:**
   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

4. **Open in Browser**
   - Click the link or manually go to: http://localhost:5173
   - The app will automatically reload when you make changes!

5. **Stop the Server**
   - Press `Ctrl+C` in the terminal

---

## 📋 Prerequisites Check

Your system is ready! ✅

- ✅ **Node.js**: v24.11.1 (installed)
- ✅ **npm**: v11.6.2 (installed)
- ✅ **Dependencies**: All 302 packages installed
- ✅ **Project**: All files in place

---

## 🎯 First Time Setup (If Needed)

If you ever need to reinstall dependencies:

```bash
# 1. Navigate to project folder
cd C:\Users\tekzo\OneDrive\Desktop\MICM

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

---

## 🧪 Test the App

Once the server is running:

1. **Open Browser**: http://localhost:5173
2. **You should see**: The MICM LMS login page
3. **Test Login** with demo accounts:
   - **Teacher**: `teacher@micm.co.za` / `password`
   - **Student**: `student@micm.co.za` / `password`
   - **Admin**: `admin@micm.co.za` / `password`

---

## 🔧 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🐛 Troubleshooting

### Port 5173 Already in Use

If you see "Port 5173 is already in use":

1. **Find and stop the process**:
   ```bash
   # Find what's using the port
   netstat -ano | findstr :5173
   
   # Kill the process (replace PID with the number from above)
   taskkill /PID <PID> /F
   ```

2. **Or use a different port**:
   ```bash
   npm run dev -- --port 3000
   ```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Server Won't Start

1. **Check Node.js version**:
   ```bash
   node --version
   ```
   Should be 18+ (you have 24.11.1 ✅)

2. **Verify package.json exists**:
   ```bash
   dir package.json
   ```

3. **Reinstall dependencies**:
   ```bash
   npm install
   ```

---

## 📝 Development Workflow

1. **Start Server**: `npm run dev` or double-click `start-dev-server.bat`
2. **Make Changes**: Edit files in Cursor
3. **See Changes**: Browser auto-refreshes (Hot Module Replacement)
4. **Test Features**: Use the app in browser
5. **Stop Server**: Press `Ctrl+C` when done

---

## 🎨 Hot Module Replacement (HMR)

The dev server has **Hot Module Replacement** enabled:
- ✅ Changes to files automatically refresh the browser
- ✅ No need to manually reload
- ✅ State is preserved when possible
- ✅ Fast development experience

---

## 📞 Quick Reference

- **Local URL**: http://localhost:5173
- **Start Script**: `start-dev-server.bat` or `npm run dev`
- **Stop Server**: `Ctrl+C` in terminal
- **Project Folder**: `C:\Users\tekzo\OneDrive\Desktop\MICM`

---

## ✅ Verification Checklist

Before starting development, verify:

- [x] Node.js installed (v24.11.1 ✅)
- [x] npm installed (v11.6.2 ✅)
- [x] Dependencies installed (302 packages ✅)
- [x] Project files present
- [ ] Dev server starts successfully
- [ ] Browser opens to login page
- [ ] Can log in with demo accounts

---

**You're all set!** 🎉 Just run `npm run dev` or double-click `start-dev-server.bat` to start coding!



